from datetime import datetime

import psycopg2
from flask import Flask, request, jsonify, g
from flask_cors import CORS
import RecommendationEngine

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Configuration
DATABASE = {
    'dbname': 's0p0i2x',
    'user': 's0p0i2x',
    'password': '',
    'host': 'localhost',
    'port': '5432'
}


def get_db():
    if 'db' not in g:
        g.db = psycopg2.connect(**DATABASE)
    return g.db


@app.teardown_appcontext
def close_db(error):
    db = g.pop('db', None)
    if db is not None:
        db.close()


@app.route('/')
def hello_world():
    return 'Hello, World!'


@app.route('/api/users', methods=['GET'])
def get_users():
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM users_workday')
    rows = cursor.fetchall()
    column_names = [desc[0] for desc in cursor.description]
    cursor.close()

    users = [dict(zip(column_names, row)) for row in rows]
    return jsonify(users)


@app.route('/api/jobs/user/<user_id>', methods=['GET'])
def get_jobs(user_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM jobs_workday')
    rows = cursor.fetchall()
    column_names = [desc[0] for desc in cursor.description]
    cursor.close()

    users = [dict(zip(column_names, row)) for row in rows]

    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM users_workday WHERE "userId" = %s', (user_id,))
    rows = cursor.fetchall()
    column_names = [desc[0] for desc in cursor.description]
    cursor.close()

    u_w = [dict(zip(column_names, row)) for row in rows][0]

    for user in users:
        rec_eng = RecommendationEngine.RecommendationEngine()
        rec_eng.set_job_description(job_skills=user.get("skills").split(","), job_description=user.get("job_description"))
        rec_eng.set_candidate_resume(candidate_skills=u_w.get("skills").split(","), candidate_education=u_w.get("education"), candidate_experience=u_w.get("years_experience"))
        print(user, rec_eng.get_matching_score())
        user["matching_score"] = rec_eng.get_matching_score().get("overall_score")

    users = sort_list_of_dicts(users, "matching_score", False)

    return jsonify(users)


def sort_list_of_dicts(list_of_dicts, key, ascending=True):
    """
    Sorts a list of dictionaries based on a specified key.

    Args:
        list_of_dicts (list): The list of dictionaries to be sorted.
        key (str): The key in the dictionaries to sort by.
        ascending (bool): Whether to sort in ascending order. Defaults to True.

    Returns:
        list: The sorted list of dictionaries.
    """
    return sorted(list_of_dicts, key=lambda x: x[key], reverse=not ascending)


@app.route('/api/filter_applications/<user_id>', methods=['POST'])
def filter_applications(user_id):
    filters = request.json
    db = get_db()
    cursor = db.cursor()

    # Base query
    query = '''
    SELECT jw."jobId", jw.location, jw.job_description, jw."createdAt", jw.duration, jw.job_title, jw.skills, jw.experience, jw.employment_type, jw.education, jw.organization
    FROM jobs_workday jw
    WHERE 1=1
    '''

    params = []

    # Adding employment type filter
    if 'employementType' in filters and filters['employementType']:
        query += ' AND jw.employment_type = ANY(%s)'
        params.append(filters['employementType'])

    # Adding education filter
    if 'educations' in filters and filters['educations']:
        query += ' AND jw.education = ANY(%s)'
        params.append(filters['educations'])

    # Adding organization filter
    if 'organizations' in filters and filters['organizations']:
        query += ' AND jw.organization = ANY(%s)'
        params.append(filters['organizations'])

    # Adding skills filter
    if 'skills' in filters and filters['skills']:
        skill_conditions = ' OR '.join(['jw.skills ILIKE %s']*len(filters['skills']))
        query += ' AND ({})'.format(skill_conditions)
        params.extend([f'%{skill}%' for skill in filters['skills']])

    # Adding location filter
    if 'locations' in filters and filters['locations']:
        location_conditions = ' OR '.join(['jw.location = %s']*len(filters['locations']))
        query += ' AND ({})'.format(location_conditions)
        params.extend([location['label'] for location in filters['locations']])

    # Adding experience filter
    if 'experience' in filters:
        query += ' AND jw.experience >= %s'
        params.append(filters['experience'])

    cursor.execute(query, params)
    result = [dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in cursor.fetchall()]

    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM users_workday WHERE "userId" = %s', (user_id,))
    rows = cursor.fetchall()
    column_names = [desc[0] for desc in cursor.description]
    cursor.close()

    u_w = [dict(zip(column_names, row)) for row in rows][0]

    for user in result:
        rec_eng = RecommendationEngine.RecommendationEngine()
        rec_eng.set_job_description(job_skills=user.get("skills").split(","),
                                    job_description=user.get("job_description"))
        rec_eng.set_candidate_resume(candidate_skills=u_w.get("skills").split(","),
                                     candidate_education=u_w.get("education"),
                                     candidate_experience=u_w.get("years_experience"))
        print(user, rec_eng.get_matching_score())
        user["matching_score"] = rec_eng.get_matching_score().get("overall_score")

    result = sort_list_of_dicts(result, "matching_score", False)

    return jsonify(result), 200


@app.route('/api/for_you/<user_id>', methods=['POST'])
def filter_applications_for_you(user_id):
    filters = request.json
    db = get_db()
    cursor = db.cursor()

    # Base query
    query = '''
    SELECT jw."jobId", jw.location, jw.job_description, jw."createdAt", jw.duration, jw.job_title, jw.skills, jw.experience, jw.employment_type, jw.education, jw.organization
    FROM jobs_workday jw
    WHERE 1=1
    '''

    params = []

    # Adding employment type filter
    if 'employementType' in filters and filters['employementType']:
        query += ' AND jw.employment_type = ANY(%s)'
        params.append(filters['employementType'])

    # Adding education filter
    if 'educations' in filters and filters['educations']:
        query += ' AND jw.education = ANY(%s)'
        params.append(filters['educations'])

    # Adding organization filter
    if 'organizations' in filters and filters['organizations']:
        query += ' AND jw.organization = ANY(%s)'
        params.append(filters['organizations'])

    # Adding skills filter
    if 'skills' in filters and filters['skills']:
        skill_conditions = ' OR '.join(['jw.skills ILIKE %s']*len(filters['skills']))
        query += ' AND ({})'.format(skill_conditions)
        params.extend([f'%{skill}%' for skill in filters['skills']])

    # Adding location filter
    if 'locations' in filters and filters['locations']:
        location_conditions = ' OR '.join(['jw.location = %s']*len(filters['locations']))
        query += ' AND ({})'.format(location_conditions)
        params.extend([location['label'] for location in filters['locations']])

    # Adding experience filter
    if 'experience' in filters:
        query += ' AND jw.experience >= %s'
        params.append(filters['experience'])

    cursor.execute(query, params)
    result = [dict((cursor.description[i][0], value) for i, value in enumerate(row)) for row in cursor.fetchall()]

    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM interested_pool WHERE "userId" = %s', (user_id,))
    rows = cursor.fetchall()
    column_names = [desc[0] for desc in cursor.description]
    cursor.close()

    u_w = [dict(zip(column_names, row)) for row in rows][0]

    for user in result:
        rec_eng = RecommendationEngine.RecommendationEngine()
        rec_eng.set_job_description(job_skills=user.get("skills").split(","),
                                    job_description=user.get("job_description"))
        rec_eng.set_candidate_resume(candidate_skills=u_w.get("skills").split(","),
                                     candidate_education=u_w.get("education"),
                                     candidate_experience=u_w.get("years_experience"))
        print(user, rec_eng.get_matching_score())
        user["matching_score"] = rec_eng.get_matching_score().get("overall_score")

    result = sort_list_of_dicts(result, "matching_score", False)

    return jsonify(result), 200


@app.route('/api/hm_request', methods=['POST'])
def add_hm_request():
    data = request.json
    db = get_db()
    cursor = db.cursor()

    # Extracting data from the request
    hm_id = data.get('hm_id')
    candidate_id = data.get('candidate_id')
    job_id = data.get('job_id')
    comments = data.get('comments')
    status = data.get('status')

    # Insert query
    cursor.execute(
        '''
        INSERT INTO hm_requests ("hmId", "candidateId", "jobId", comments, status)
        VALUES (%s, %s, %s, %s, %s)
        ''',
        (hm_id, candidate_id, job_id, comments, status)
    )

    db.commit()

    return jsonify({'message': 'Request added successfully'}), 201


@app.route('/api/hm_requests/<hmId>', methods=['GET'])
def get_hm_requests(hmId):
    db = get_db()
    cursor = db.cursor()

    # Query to get hm_requests by hmId and join with users_workday to get user names
    cursor.execute(
        '''
        SELECT hr."hmId", hr."candidateId", hr."jobId", hr.comments, 
               candidate.name as candidateName, hm.name as hmName, status
        FROM hm_requests hr
        INNER JOIN users_workday candidate ON hr."candidateId" = candidate."userId"
        INNER JOIN users_workday hm ON hr."hmId" = hm."userId"
        WHERE hr."hmId" = %s or hr."candidateId" = %s
        ''',
        (hmId,hmId)
    )

    result = [dict((cursor.description[i][0], value) \
                   for i, value in enumerate(row)) for row in cursor.fetchall()]

    return jsonify(result), 200


@app.route('/api/update_hm_request_status', methods=['PUT'])
def update_hm_request_status():
    data = request.json
    db = get_db()
    cursor = db.cursor()

    # Extracting data from the request
    hm_id = data.get('hm_id')
    candidate_id = data.get('candidate_id')
    job_id = data.get('job_id')
    status = data.get('status')

    # Update query
    cursor.execute(
        '''
        UPDATE hm_requests
        SET status = %s
        WHERE "hmId" = %s AND "candidateId" = %s AND "jobId" = %s
        ''',
        (status, hm_id, candidate_id, job_id)
    )

    db.commit()

    if cursor.rowcount == 0:
        return jsonify({'message': 'Request not found'}), 404

    return jsonify({'message': 'Status updated successfully'}), 200


@app.route('/api/jobs', methods=['POST'])
def add_job():
    db = get_db()
    cursor = db.cursor()
    job_data = request.json

    employment_type = job_data.get('employment_type')
    experience = job_data.get('experience')
    hmId = job_data.get('hmId')
    hm_email = job_data.get('hm_email')
    hm_name = job_data.get('hm_name')
    jobId = job_data.get('jobId')
    job_description = job_data.get('job_description')
    job_title = job_data.get('job_title')
    organization = job_data.get('organization')
    recruiter_email = job_data.get('recruiter_email')
    recruiter_name = job_data.get('recruiter_name')
    skills = job_data.get('skills')
    location = job_data.get('location')
    duration = job_data.get('duration')

    print(job_data)

    # # Ensure all required fields are provided
    # if not all([employment_type, experience, hmId, hm_email, hm_name, jobId, job_description, job_title, organization,
    #             recruiter_email, recruiter_name, skills, location, duration]):
    #     return jsonify({'error': 'Missing required fields'}), 400

    cursor.execute('''
        INSERT INTO jobs_workday (
            employment_type, experience, "hmId", hm_email, hm_name, "jobId", job_description, job_title, 
            organization, recruiter_email, recruiter_name, skills, location, duration, "createdAt"
        ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, timezone('utc', now()))
        RETURNING "jobId"
    ''', (employment_type, experience, hmId, hm_email, hm_name, jobId, job_description, job_title,
          organization, recruiter_email, recruiter_name, skills, location, duration))

    job_id = cursor.fetchone()[0]
    db.commit()
    cursor.close()

    return jsonify({'status': 'success', 'job_id': job_id}), 201


@app.route('/api/jobs/<job_id>', methods=['GET'])
def get_job_id(job_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM jobs_workday where "jobId" = %s', (job_id,))
    rows = cursor.fetchall()
    column_names = [desc[0] for desc in cursor.description]
    cursor.close()

    users = [dict(zip(column_names, row)) for row in rows]
    return jsonify(users)


@app.route('/api/users', methods=['POST'])
def add_user():
    db = get_db()
    cursor = db.cursor()
    username = request.json['username']
    email = request.json['email']
    cursor.execute('INSERT INTO users (username, email) VALUES (%s, %s)', (username, email))
    db.commit()
    cursor.close()
    return jsonify({'status': 'success'}), 201


# Endpoint to get bookmarks of a user
@app.route('/api/bookmarks/<user_id>', methods=['GET'])
def get_bookmarks(user_id):
    db = get_db()
    cursor = db.cursor()

    cursor.execute('SELECT jobs_workday.* FROM jobs_workday INNER JOIN bookmarks ON jobs_workday."jobId" = '
                   'bookmarks.jobid AND bookmarks.userid = %s ', (user_id,))
    rows = cursor.fetchall()
    column_names = [desc[0] for desc in cursor.description]
    cursor.close()

    users = [dict(zip(column_names, row)) for row in rows]
    return jsonify(users)


# Endpoint to get bookmarks of a user
@app.route('/api/bookmarks/<user_id>/<job_id>', methods=['GET'])
def get_bookmark_user_job(user_id, job_id):
    db = get_db()
    cursor = db.cursor()

    cursor.execute('SELECT count(*) FROM jobs_workday INNER JOIN bookmarks ON jobs_workday."jobId" = '
                   'bookmarks.jobid AND bookmarks.userid = %s AND bookmarks.jobid = %s', (user_id, job_id))
    rows = cursor.fetchall()
    column_names = [desc[0] for desc in cursor.description]
    cursor.close()

    users = [dict(zip(column_names, row)) for row in rows]
    return jsonify(users)


# Endpoint to add a bookmark
@app.route('/api/bookmarks', methods=['POST'])
def add_bookmark():
    db = get_db()
    cursor = db.cursor()
    bookmark_data = request.json
    jobId = bookmark_data.get('jobId')
    userId = bookmark_data.get('userId')

    if not jobId or not userId:
        return jsonify({'error': 'Missing jobId or userId'}), 400

    # Insert the bookmark, and if it exists, delete it
    cursor.execute('''
        INSERT INTO bookmarks (jobId, userId)
        VALUES (%s, %s)
        ON CONFLICT (jobId, userId) 
        DO NOTHING
        RETURNING *
    ''', (jobId, userId))

    if cursor.rowcount == 0:
        # If no row was inserted, it means the bookmark already existed
        cursor.execute('DELETE FROM bookmarks WHERE jobId = %s AND userId = %s', (jobId, userId))
        db.commit()
        cursor.close()
        return jsonify({'status': 'bookmark removed'}), 200

    db.commit()
    cursor.close()

    return jsonify({'status': 'bookmark added'}), 201


# Endpoint to remove a bookmark
@app.route('/api/bookmarks', methods=['DELETE'])
def remove_bookmark():
    db = get_db()
    cursor = db.cursor()
    bookmark_data = request.json
    jobId = bookmark_data.get('jobId')
    userId = bookmark_data.get('userId')

    print("Delete bookmark", bookmark_data)

    if not jobId or not userId:
        return jsonify({'error': 'Missing jobId or userId'}), 400

    cursor.execute('DELETE FROM bookmarks WHERE jobId = %s AND userId = %s', (jobId, userId))
    db.commit()
    cursor.close()

    return jsonify({'status': 'success'}), 200


# Endpoint to like or dislike a suggestion
@app.route('/api/suggestion', methods=['POST'])
def like_dislike_suggestion():
    db = get_db()
    cursor = db.cursor()
    like_data = request.json
    suggestionId = like_data.get('jobId')
    userId = like_data.get('userId')
    liked = like_data.get('liked')

    if not suggestionId or not userId or liked is None:
        return jsonify({'error': 'Missing suggestionId, userId, or liked status'}), 400

    cursor.execute('''
        INSERT INTO likes_dislikes (jobId, userId, liked)
        VALUES (%s, %s, %s)
        ON CONFLICT (jobId, userId)
        DO UPDATE SET liked = EXCLUDED.liked
    ''', (suggestionId, userId, liked))

    db.commit()
    cursor.close()

    return jsonify({'status': 'success'}), 201


# Endpoint to remove a like or dislike
@app.route('/api/suggestion', methods=['DELETE'])
def remove_like_dislike():
    db = get_db()
    cursor = db.cursor()
    like_data = request.json
    suggestionId = like_data.get('jobId')
    userId = like_data.get('userId')

    print("DELETE Suggestion", like_data)

    if not suggestionId or not userId:
        return jsonify({'error': 'Missing suggestionId or userId'}), 400

    cursor.execute('DELETE FROM likes_dislikes WHERE jobId = %s AND userId = %s', (suggestionId, userId))
    db.commit()
    cursor.close()

    return jsonify({'status': 'success'}), 200


@app.route('/api/interested_pool', methods=['POST'])
def add_to_interested_pool():
    db = get_db()
    cursor = db.cursor()
    payload = request.json

    print(request.json)

    userId = payload.get('userId')
    skills = payload.get('skills')
    experience = payload.get('experience')
    employement_type = payload.get('employement_type')
    locations = payload.get('locations')
    education = payload.get('education')
    job_family = payload.get('job_family')

    if not userId:
        return jsonify({'error': 'Missing userId'}), 400

    cursor.execute('''
        INSERT INTO interested_pool ("userId", skills, experience, employement_type, locations, education, job_family)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        ON CONFLICT ("userId") DO UPDATE SET
            skills = EXCLUDED.skills,
            experience = EXCLUDED.experience,
            employement_type = EXCLUDED.employement_type,
            locations = EXCLUDED.locations,
            education = EXCLUDED.education,
            job_family = EXCLUDED.job_family
    ''', (userId, skills, experience, employement_type, locations, education, job_family))

    db.commit()
    cursor.close()

    return jsonify({'status': 'success'}), 201


@app.route('/api/applied_applications', methods=['POST'])
def add_applied_application():
    db = get_db()
    cursor = db.cursor()
    application_data = request.json

    userId = application_data.get('userId')
    jobId = application_data.get('jobId')
    status = application_data.get('status')
    comments = application_data.get('comments')
    availability = application_data.get('availability')
    print(application_data)

    if not userId or not jobId:
        return jsonify({'error': 'Missing userId or jobId'}), 400

    cursor.execute('''
        INSERT INTO applied_applications ("userId", "jobId", status, comments, availability)
        VALUES (%s, %s, %s, %s, %s)
        ON CONFLICT ("userId", "jobId") DO UPDATE SET
            status = EXCLUDED.status,
            comments = EXCLUDED.comments,
            availability = EXCLUDED.availability
    ''', (userId, jobId, status, comments, availability))

    db.commit()
    cursor.close()

    return jsonify({'status': 'success'}), 201


@app.route('/api/applications/<userId>', methods=['GET'])
def get_applications(userId):
    db = get_db()
    cursor = db.cursor()

    # Execute a query
    cursor.execute(
        '''
        SELECT aa."jobId", jw.location, aa.status, aa.availability, aa.comments, jw.hm_name, jw.hm_email, jw.job_title, jw.skills, jw.experience, uw.name, uw.role, uw.years_experience 
        FROM applied_applications aa 
        INNER JOIN jobs_workday jw ON aa."jobId" = jw."jobId" 
        INNER JOIN users_workday uw ON aa."userId" = uw."userId" 
        WHERE aa."userId" = %s
        ''',
        (userId,)
    )

    # Fetch the result
    result = [dict((cursor.description[i][0], value) \
                   for i, value in enumerate(row)) for row in cursor.fetchall()]

    return jsonify(result), 200


@app.route('/api/applications/<userId>/<jobId>', methods=['DELETE'])
def delete_application(userId, jobId):
    db = get_db()
    cursor = db.cursor()

    # Execute the DELETE query
    cursor.execute(
        '''
        DELETE FROM applied_applications 
        WHERE "userId" = ? AND "jobId" = ?
        ''',
        (userId, jobId)
    )

    db.commit()

    if cursor.rowcount == 0:
        return jsonify({'message': 'Application not found'}), 404

    return jsonify({'message': 'Application deleted successfully'}), 200


@app.route('/api/applications/hm/<user_id>', methods=['GET'])
def get_applications_hm(user_id):
    hm_id = user_id
    db = get_db()

    print(hm_id)

    cursor = db.cursor()
    cursor.execute("""
            SELECT 
                u.name AS candidate_name,
                u."userId" AS candidate_user_id,
                u.years_experience AS experience,
                u.current_location AS location,
                a.status AS status,
                a.availability AS availability,
                a."jobId" AS job_id
            FROM 
                users_workday u
            INNER JOIN 
                applied_applications a ON u."userId" = a."userId"
            INNER JOIN 
                jobs_workday j ON a."jobId" = j."jobId"
            WHERE 
                j."hmId" = %s
        """, (hm_id,))

    # Fetch the result
    result = [dict((cursor.description[i][0], value) \
                   for i, value in enumerate(row)) for row in cursor.fetchall()]

    return jsonify(result), 200


@app.route('/api/users_details', methods=['GET'])
def get_users_details():
    db = get_db()
    cursor = db.cursor()

    # Query to get users from users_workday and interested_pool with an INNER JOIN
    cursor.execute(
        '''
        SELECT uw.*, 
               ip.*
        FROM users_workday uw
        INNER JOIN interested_pool ip ON uw."userId" = ip."userId"
        '''
    )

    result = [dict((cursor.description[i][0], value) \
                   for i, value in enumerate(row)) for row in cursor.fetchall()]

    return jsonify(result), 200


@app.route('/api/update_application_status', methods=['PUT'])
def update_application_status():
    data = request.json
    db = get_db()
    cursor = db.cursor()

    # Extracting data from the request
    user_id = data.get('user_id')
    job_id = data.get('job_id')
    status = data.get('status')

    # Update query
    cursor.execute(
        '''
        UPDATE applied_applications
        SET status = %s
        WHERE "userId" = %s AND "jobId" = %s
        ''',
        (status, user_id, job_id)
    )

    db.commit()

    if cursor.rowcount == 0:
        return jsonify({'message': 'Application not found'}), 404

    return jsonify({'message': 'Status updated successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True)

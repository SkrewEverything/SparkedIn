import re
import spacy
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# Load spacy model for advanced preprocessing
nlp = spacy.load("en_core_web_sm")

class RecommendationEngine:
    def __init__(self):
        self.job_description = ""
        self.job_skills = []
        self.candidate_resume = ""
        self.candidate_skills = []
        self.candidate_experience = 0
        self.candidate_education = ""

    def set_job_description(self, job_description, job_skills):
        self.job_description = job_description
        self.job_skills = job_skills

    def set_candidate_resume(self, candidate_resume="", candidate_skills=[], candidate_experience=0, candidate_education=""):
        self.candidate_resume = candidate_resume
        self.candidate_skills = candidate_skills
        self.candidate_experience = candidate_experience
        self.candidate_education = candidate_education

    def preprocess_text(self, text):
        # Advanced text preprocessing: lowercase, remove punctuation, tokenize, lemmatize, and remove stop words
        doc = nlp(text.lower())
        tokens = [token.lemma_ for token in doc if not token.is_stop and not token.is_punct and len(token) > 2]
        return " ".join(tokens)

    def skill_matching_score(self):
        job_skills_set = set(self.job_skills)
        candidate_skills_set = set(self.candidate_skills)
        common_skills = job_skills_set.intersection(candidate_skills_set)
        score = len(common_skills) / len(job_skills_set) if job_skills_set else 0
        return score

    def cosine_similarity_score(self):
        combined_job_text = self.preprocess_text(self.job_description + " " + " ".join(self.job_skills))
        combined_candidate_text = self.preprocess_text(self.candidate_resume + " " + " ".join(self.candidate_skills))
        documents = [combined_job_text, combined_candidate_text]
        count_vectorizer = CountVectorizer().fit_transform(documents)
        vectors = count_vectorizer.toarray()
        cosine_sim = cosine_similarity(vectors)
        return cosine_sim[0][1]

    def experience_matching_score(self, required_experience):
        # Normalize the experience score to be between 0 and 1
        score = min(self.candidate_experience / required_experience, 1) if required_experience > 0 else 0
        return score

    def education_matching_score(self, required_education):
        # Simple education level matching: Assume required_education and candidate_education are strings like "Bachelor", "Master", "PhD"
        education_levels = {"none": 0, "highschool": 1, "associate": 2, "bachelor": 3, "master": 4, "phd": 5}
        job_education_level = education_levels.get(required_education.lower(), 0)
        candidate_education_level = education_levels.get(self.candidate_education.lower(), 0)
        score = 1 if candidate_education_level >= job_education_level else 0
        return score

    def get_matching_score(self, required_experience=0, required_education="none"):
        skill_score = self.skill_matching_score()
        combined_text_score = self.cosine_similarity_score()
        experience_score = self.experience_matching_score(required_experience)
        education_score = self.education_matching_score(required_education)
        overall_score = (skill_score * 0.4 + combined_text_score * 0.2 + experience_score * 0.3 + education_score * 0.1)
        return {
            "skill_score": f"{skill_score * 100:.2f}%",
            "combined_text_score": f"{combined_text_score * 100:.2f}%",
            "experience_score": f"{experience_score * 100:.2f}%",
            "education_score": f"{education_score * 100:.2f}%",
            "overall_score": f"{overall_score * 100:.2f}%"
        }

# Example usage:
# recommendation_engine = RecommendationEngine()
# recommendation_engine.set_job_description("Looking for a data scientist with Python and Machine Learning skills", ["Python", "Machine Learning"])
# recommendation_engine.set_candidate_resume("Experienced in Python and deep learning", ["Python", "Deep Learning"], 3, "Bachelor")
# scores = recommendation_engine.get_matching_score(required_experience=2, required_education="Bachelor")
# print(scores)

jd = '''
Description
We are looking for a highly skilled and experienced Senior Software Engineer to join our dynamic team. As a Senior Software Engineer, you will play a pivotal role in the development of our innovative software solutions. You will work closely with cross-functional teams to design, develop, and implement complex software applications. The ideal candidate will have a strong software engineering background, exceptional problem-solving skills, and a passion for delivering high-quality software products.

Responsibilities
Lead the design and development of scalable and reliable software applications
Collaborate with product managers and technical teams to define software requirements and specifications
Write clean, maintainable, and efficient code to ensure the highest standards of software quality
Conduct code reviews, provide feedback, and mentor junior engineers
Identify and resolve software defects and performance issues
Stay up-to-date with the latest software development trends and best practices
Participate in the full software development lifecycle, from concept and design to testing and deployment
Requirements
Bachelor's degree in Computer Science, Engineering, or a related field
5+ years of experience in software development, with a focus on backend systems
Proficiency in at least one programming language such as Java, C++, or Python
Experience with distributed systems and microservices architecture
Strong understanding of database design and optimization techniques
Familiarity with cloud platforms such as AWS or Azure
Excellent problem-solving and analytical skills
Strong communication and collaboration skills
'''
jd_skills = ["java", "c++", "python", "kafka"]
engine = RecommendationEngine()
engine.set_job_description(job_description=jd, job_skills=jd_skills)
engine.set_candidate_resume(candidate_skills=["c++", "mysql", "database", "python", "java"], candidate_experience=5, candidate_education="Bachelor")

print(engine.get_matching_score(required_experience=5))

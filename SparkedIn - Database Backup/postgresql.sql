--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Postgres.app)
-- Dumped by pg_dump version 16.3 (Postgres.app)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: applied_applications; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.applied_applications (
    "userId" character varying NOT NULL,
    "jobId" character varying NOT NULL,
    status character varying DEFAULT 'Applied'::character varying,
    comments character varying,
    availability character varying
);


ALTER TABLE public.applied_applications OWNER TO postgres;

--
-- Name: bookmarks; Type: TABLE; Schema: public; Owner: s0p0i2x
--

CREATE TABLE public.bookmarks (
    jobid character varying NOT NULL,
    userid character varying NOT NULL
);


ALTER TABLE public.bookmarks OWNER TO s0p0i2x;

--
-- Name: hm_requests; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hm_requests (
    "hmId" character varying,
    "candidateId" character varying,
    "jobId" character varying,
    comments character varying,
    status character varying
);


ALTER TABLE public.hm_requests OWNER TO postgres;

--
-- Name: interested_pool; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.interested_pool (
    "userId" character varying NOT NULL,
    skills character varying,
    experience character varying,
    employement_type character varying,
    locations character varying,
    education character varying,
    job_family character varying
);


ALTER TABLE public.interested_pool OWNER TO postgres;

--
-- Name: jobs_workday; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.jobs_workday (
    "jobId" character varying,
    job_description character varying,
    "hmId" character varying,
    hm_email character varying,
    hm_name character varying,
    job_title character varying,
    skills character varying,
    organization character varying,
    employment_type character varying,
    recruiter_name character varying,
    recruiter_email character varying,
    location character varying,
    duration character varying,
    "createdAt" timestamp with time zone DEFAULT timezone('utc'::text, now()),
    education character varying,
    experience integer
);


ALTER TABLE public.jobs_workday OWNER TO postgres;

--
-- Name: likes_dislikes; Type: TABLE; Schema: public; Owner: s0p0i2x
--

CREATE TABLE public.likes_dislikes (
    jobid character varying NOT NULL,
    userid character varying NOT NULL,
    liked boolean NOT NULL
);


ALTER TABLE public.likes_dislikes OWNER TO s0p0i2x;

--
-- Name: users_workday; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users_workday (
    "userId" character varying,
    name character varying,
    education character varying,
    role character varying,
    business_area character varying,
    manager character varying,
    skills character varying,
    years_experience character varying,
    current_location character varying,
    current_organization character varying
);


ALTER TABLE public.users_workday OWNER TO postgres;

--
-- Data for Name: applied_applications; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.applied_applications ("userId", "jobId", status, comments, availability) FROM stdin;
u7	j2	Applied	comments to HM	1-2 months
u10	J100	Applied	Comments to HM	1-2 months
u10	j22	Applied	Comments to HM	4-5 months
u4	J100	Applied	Comments to HM	1-2 Months
u4	j22	Applied	Comments to HM	2-5 months
u1	J203	Rejected		2-3 months
u10	J201	Withdraw		
\.


--
-- Data for Name: bookmarks; Type: TABLE DATA; Schema: public; Owner: s0p0i2x
--

COPY public.bookmarks (jobid, userid) FROM stdin;
j3	u7
j4	u7
j2	u7
J203	u1
\.


--
-- Data for Name: hm_requests; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hm_requests ("hmId", "candidateId", "jobId", comments, status) FROM stdin;
u10	u2	j203		Accept
\.


--
-- Data for Name: interested_pool; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.interested_pool ("userId", skills, experience, employement_type, locations, education, job_family) FROM stdin;
u3	Python, TensorFlow	7	Full-Time	Boston	PhD	AI
u4	Java, SQL	4	Full-Time	Chicago	Bachelor's	IT
u5	JavaScript, React	3	Full-Time	Seattle	Master's	UI/UX
u6	AWS, Docker	6	Full-Time	Austin	Bachelor's	Operations
u8	Agile, Scrum	8	Full-Time	Miami	Master's	Product
u9	Excel, SQL	3	Full-Time	Orlando	Bachelor's	Business
u2	Spring Boot, MySQL, Software Quality (SQA/SQC)	3	fullTime, contract	Mississauga, Ontario, Canada, Dallas, Texas, United States	Associate	Business services, Business operations, Communications and corporate affairs, Compliance, ethics, and legal, Continuous improvement, Data analytics and management
u1	Kafka, Python, MySQL, Java, Spring Boot, Cassandra, Redis	5	fullTime, temporary	Sunnyvale, California, United States, India	masters	Business operations, Business services, Communications and corporate affairs
u10	Redis , MySQL	5	fullTime,temporary	Mississauga, Ontario, Canada, United States	masters	Compliance, ethics, and legal, Communications and corporate affairs
u7	Redis, React Native, Backend	2	contract, temporary	Mississauga, Ontario, Canada, California, United States	Associate	Business operations, Business services, Compliance, ethics, and legal
\.


--
-- Data for Name: jobs_workday; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.jobs_workday ("jobId", job_description, "hmId", hm_email, hm_name, job_title, skills, organization, employment_type, recruiter_name, recruiter_email, location, duration, "createdAt", education, experience) FROM stdin;
J201	Description\nWe are seeking a talented and motivated Software Engineer to join our team. As a Software Engineer, you will be responsible for designing, developing, and maintaining software applications that meet the needs of our clients. You will work closely with the rest of the development team to ensure the successful delivery of high-quality software solutions.\n\nResponsibilities\nCollaborate with the product management and design teams to understand software requirements and translate them into technical specifications.\nDevelop software applications according to the defined specifications, ensuring high-quality code.\nTroubleshoot and debug software defects and performance issues.\nMaintain and enhance existing software applications, ensuring they remain current and efficient.\nConduct comprehensive software testing to ensure robustness and reliability.\nCollaborate with cross-functional teams to integrate software components and resolve technical and design dependencies.\nConduct code reviews and provide constructive feedback to peers.\nStay up-to-date with emerging software development trends and technologies.\nRequirements\nBachelor's degree in Computer Science or a related field.\nProven experience in software development, including full-stack development.\nStrong knowledge of programming languages such as Java, Python, or C++.\nExperience with web development frameworks such as React, Angular, or Django.\nFamiliarity with database technologies such as MySQL, MongoDB, or PostgreSQL.\nProficiency in using version control systems like Git.\nSolid understanding of software development principles, patterns, and best practices.\nStrong problem-solving and analytical skills.\nExcellent communication and collaboration abilities.\nAbility to work independently and as part of a team.\nHighly motivated and eager to learn new technologies and techniques.\nExperience with cloud computing platforms like AWS or Azure is a plus.\nFamiliarity with Agile development methodologies is a plus.\nExperience with mobile app development is a plus.\nStrong attention to detail and a passion for producing high-quality software.	u10	hm10@email.com	Lucas	Software Engineer III	Java, C++, Kafka, RabbitMQ, MySQL, Python, CosmosDB, Backend, Frontend, React, React Native	Walmart	Full-Time	John 	r@email.com	Sunnyvale, CA, USA		2024-06-23 04:01:05.703007-07	\N	2
J202	Description\nWe are seeking a talented and motivated Software Engineer to join our team. As a Software Engineer, you will be responsible for designing, developing, and maintaining software applications that meet the needs of our clients. You will work closely with the rest of the development team to ensure the successful delivery of high-quality software solutions.\n\nResponsibilities\nCollaborate with the product management and design teams to understand software requirements and translate them into technical specifications.\nDevelop software applications according to the defined specifications, ensuring high-quality code.\nTroubleshoot and debug software defects and performance issues.\nMaintain and enhance existing software applications, ensuring they remain current and efficient.\nConduct comprehensive software testing to ensure robustness and reliability.\nCollaborate with cross-functional teams to integrate software components and resolve technical and design dependencies.\nConduct code reviews and provide constructive feedback to peers.\nStay up-to-date with emerging software development trends and technologies.\nRequirements\nBachelor's degree in Computer Science or a related field.\nProven experience in software development, including full-stack development.\nStrong knowledge of programming languages such as Java, Python, or C++.\nExperience with web development frameworks such as React, Angular, or Django.\nFamiliarity with database technologies such as MySQL, MongoDB, or PostgreSQL.\nProficiency in using version control systems like Git.\nSolid understanding of software development principles, patterns, and best practices.\nStrong problem-solving and analytical skills.\nExcellent communication and collaboration abilities.\nAbility to work independently and as part of a team.\nHighly motivated and eager to learn new technologies and techniques.\nExperience with cloud computing platforms like AWS or Azure is a plus.\nFamiliarity with Agile development methodologies is a plus.\nExperience with mobile app development is a plus.\nStrong attention to detail and a passion for producing high-quality software.	u10	hm10@email.com	Lucas	Senior Software Engineer	Java, C++, Kafka, RabbitMQ, MySQL, Python, CosmosDB	Sams Club	Temporary	John 	r@email.com	Sunnyvale, CA, USA	2-3 months	2024-06-23 04:02:41.305237-07	\N	3
J203	Description\nWe are seeking a talented Data Engineer to join our team. As a Data Engineer, you will play a crucial role in developing, maintaining, and optimizing our data infrastructure. You will work closely with our data scientists and analysts to ensure the availability, integrity, and efficiency of our data pipelines and data warehouse. This is a great opportunity for someone with a strong background in data engineering and a passion for working with big data.\n\nResponsibilities\nDevelop and maintain scalable data pipelines using modern data engineering technologies\nDesign and implement data models for efficient storage and retrieval of large datasets\nCollaborate with cross-functional teams to understand and support data requirements for various business functions\nOptimize data ingestion, transformation, and processing workflows to improve performance and reliability\nMonitor and troubleshoot data pipeline issues to ensure high availability and data integrity\nImplement data governance and security measures to protect sensitive data\nExplore and recommend new technologies and tools to improve data engineering capabilities\nRequirements\nBachelor's degree in Computer Science, Engineering, or a related field\nProven work experience as a Data Engineer or in a similar role\nStrong programming skills in Python, Scala, or Java\nExperience with big data technologies such as Hadoop, Spark, and Kafka\nProficiency in SQL and database design principles\nThorough understanding of data warehousing concepts and methodologies\nFamiliarity with cloud platforms such as AWS, Azure, or GCP\nStrong analytical and problem-solving skills\nExcellent communication and collaboration abilities\nAbility to work in a fast-paced and dynamic environment\nAttention to detail and a commitment to delivering high-quality work\nExperience with data visualization tools such as Tableau or Power BI is a plus\nKnowledge of machine learning concepts and frameworks is a plus	u10	hm10@email.com	Lucas	Data Engineer	Python, tensorflow, Java	Walmart	Temporary	John 	r@email.com	Sunnyvale, CA, USA	2-3 months	2024-06-23 04:03:29.903153-07	\N	1
J204	Description\nWe are currently seeking a highly motivated and experienced Senior Manager to join our team. As a Senior Manager, you will be responsible for leading and managing a team of professionals to ensure the successful delivery of projects and the achievement of business objectives. You will work closely with cross-functional teams to drive operational excellence and implement best practices.\n\nResponsibilities\nLead and manage a team of professionals, providing guidance and support to ensure the successful delivery of projects\nDevelop and implement strategies to achieve business objectives and drive continuous improvement\nBuild and maintain strong relationships with key stakeholders, both internally and externally\nMonitor and analyze project performance, identify areas for improvement, and implement corrective actions\nManage project budgets and resource allocation to ensure optimal utilization\nCollaborate with cross-functional teams to drive operational excellence and implement best practices\nFoster a positive and collaborative work environment that encourages teamwork and personal development\nRequirements\nBachelor's degree in a relevant field\nProven experience in project management, with a focus on delivering successful outcomes\nStrong leadership and management skills, with the ability to inspire and motivate a team\nExcellent communication and interpersonal skills, with the ability to build and maintain relationships with stakeholders at all levels\nSolid analytical and problem-solving abilities, with a strategic mindset\nStrong organizational and time management skills, with the ability to prioritize and manage multiple projects simultaneously\nProficiency in project management software and tools	u10	hm10@email.com	Lucas	Senior Manager	Python, tensorflow, Java, C++, Spring Boot	Sams Club	Full-Time	John 	r@email.com	Sunnyvale, CA, USA	2-3 months	2024-06-23 04:04:22.006922-07	\N	1
\.


--
-- Data for Name: likes_dislikes; Type: TABLE DATA; Schema: public; Owner: s0p0i2x
--

COPY public.likes_dislikes (jobid, userid, liked) FROM stdin;
j2	u7	t
j4	u7	f
\.


--
-- Data for Name: users_workday; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users_workday ("userId", name, education, role, business_area, manager, skills, years_experience, current_location, current_organization) FROM stdin;
u2	John Doe	Master's	Data Scientist	Data Analytics	Emily Davis	R, Python	3	San Francisco	Company B
u3	Jane Roe	PhD	Machine Learning Engineer	AI	Mark Lee	Python, TensorFlow	7	Boston	Company C
u4	Richard Roe	Bachelor's	Backend Developer	IT	Laura Wilson	Java, SQL	4	Chicago	Company D
u5	Emma White	Master's	Frontend Developer	UI/UX	Alice Kim	JavaScript, React	3	Seattle	Company E
u6	Michael Green	Bachelor's	DevOps Engineer	Operations	Steve Brown	AWS, Docker	6	Austin	Company F
u7	Sophia Black	Bachelor's	Data Analyst	Data Analytics	John Blue	SQL, R	2	Denver	Company G
u8	Daniel Grey	Master's	Product Manager	Product	Nancy White	Agile, Scrum	8	Miami	Company H
u9	Olivia Red	Bachelor's	Business Analyst	Business	James Green	Excel, SQL	3	Orlando	Company I
u10	Lucas Yellow	Master's	Manager	IT	Sarah Orange	JavaScript, Node.js	5	Dallas	Sams Club
u1	Alice Smith	Bachelor's	Software Engineer	IT	Bob Johnson	Python, SQL, Java, tensorflow	5	New York	Walmart
\.


--
-- Name: applied_applications applied_applications_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.applied_applications
    ADD CONSTRAINT applied_applications_pkey PRIMARY KEY ("userId", "jobId");


--
-- Name: bookmarks bookmarks_pkey; Type: CONSTRAINT; Schema: public; Owner: s0p0i2x
--

ALTER TABLE ONLY public.bookmarks
    ADD CONSTRAINT bookmarks_pkey PRIMARY KEY (jobid, userid);


--
-- Name: interested_pool interested_pool_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.interested_pool
    ADD CONSTRAINT interested_pool_pkey PRIMARY KEY ("userId");


--
-- Name: likes_dislikes likes_dislikes_pkey; Type: CONSTRAINT; Schema: public; Owner: s0p0i2x
--

ALTER TABLE ONLY public.likes_dislikes
    ADD CONSTRAINT likes_dislikes_pkey PRIMARY KEY (jobid, userid);


--
-- PostgreSQL database dump complete
--


const STORAGE_KEY = "f1flow.state.v1";

const defaults = {
  profile: {
    name: "Fredrick Kamau",
    country: "Kenya",
    status: "Current International Student",
    university: "Indiana University Bloomington",
    programStart: "2023-08",
    graduation: "2025-05",
    field: "Health Informatics"
  },
  checklist: {
    "Book temporary housing": true,
    "Airport pickup arranged": true,
    "Get a SIM card": false,
    "Open a bank account": false,
    "Campus check-in and student documents": false,
    "Get health insurance card": false,
    "Apply for SSN if eligible": false,
    "Get driver's license": false
  },
  posts: [],
  ideas: [],
  actionLog: [],
  savedPosts: [],
  travelMemberships: [],
  travelMatches: [],
  mentorRequests: [],
  serviceViews: [],
  recommendationRequests: {},
  theme: "light"
};

let state = loadState();
let activeMentorFilter = "All";
let activePostFilter = "All Topics";
let activeProfileFilter = "All";
let activeProfileTab = "overview";
let activeIdeaFilter = "All Ideas";
let activeArrivalTab = "Housing";
let travelSearch = null;
let selectedProfileId = "student-fredrick";
let selectedDashboardProfileId = "student-fredrick";

const modules = [
  ["Visa & Timeline Engine", "Personalized visa, permit, work authorization, milestone tracking, and deadline alerts.", "Core Feature", "dashboard"],
  ["Mentorship Marketplace", "Verified mentors matched by school, visa path, field, country, and goal.", "Free & Paid", "mentors"],
  ["Community Layer", "Peer Q&A with real student answers about visas, jobs, housing, arrival, and student life.", "Always Free", "community"],
  ["Group Travel Matching", "Find students flying from your country to your university.", "Viral Feature", "travel"],
  ["Arrival & Hospitality", "Housing, airport pickup, SIM cards, banking, and checklist support.", "Pre-arrival", "arrival"],
  ["Think Lab", "Post ideas, get mentor validation, and find collaborators.", "Innovation", "thinklab"],
  ["Trust & Reputation", "Build credibility through mentor trust and helpful community contributions.", "Career Capital", "dashboard"]
];

const africanCountries = [
  "Algeria",
  "Angola",
  "Benin",
  "Botswana",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cameroon",
  "Central African Republic",
  "Chad",
  "Comoros",
  "Democratic Republic of the Congo",
  "Republic of the Congo",
  "Cote d'Ivoire",
  "Djibouti",
  "Egypt",
  "Equatorial Guinea",
  "Eritrea",
  "Eswatini",
  "Ethiopia",
  "Gabon",
  "Gambia",
  "Ghana",
  "Guinea",
  "Guinea-Bissau",
  "Kenya",
  "Lesotho",
  "Liberia",
  "Libya",
  "Madagascar",
  "Malawi",
  "Mali",
  "Mauritania",
  "Mauritius",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Niger",
  "Nigeria",
  "Rwanda",
  "Sao Tome and Principe",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Sudan",
  "Tanzania",
  "Togo",
  "Tunisia",
  "Uganda",
  "Zambia",
  "Zimbabwe"
];

const worldCountries = [
  "Argentina",
  "Australia",
  "Bangladesh",
  "Brazil",
  "Canada",
  "China",
  "Colombia",
  "France",
  "Germany",
  "India",
  "Indonesia",
  "Ireland",
  "Italy",
  "Japan",
  "Malaysia",
  "Mexico",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Pakistan",
  "Philippines",
  "Singapore",
  "South Korea",
  "Spain",
  "Sri Lanka",
  "Thailand",
  "Turkey",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Vietnam"
];

const usUniversities = [
  "Abilene Christian University",
  "Adelphi University",
  "Agnes Scott College",
  "Air Force Institute of Technology",
  "Alabama A&M University",
  "Alabama State University",
  "Alaska Pacific University",
  "Albany State University",
  "Albion College",
  "Alcorn State University",
  "American University",
  "Amherst College",
  "Appalachian State University",
  "Arizona State University",
  "Arkansas State University",
  "Auburn University",
  "Ball State University",
  "Barnard College",
  "Baylor University",
  "Berea College",
  "Binghamton University",
  "Boise State University",
  "Boston College",
  "Boston University",
  "Bowdoin College",
  "Brandeis University",
  "Brigham Young University",
  "Brown University",
  "Bryn Mawr College",
  "Bucknell University",
  "California Institute of Technology",
  "California Polytechnic State University",
  "California State Polytechnic University, Pomona",
  "California State University, Bakersfield",
  "California State University, Channel Islands",
  "California State University, Chico",
  "California State University, Dominguez Hills",
  "California State University, East Bay",
  "California State University, Fresno",
  "California State University, Fullerton",
  "California State University, Long Beach",
  "California State University, Los Angeles",
  "California State University, Monterey Bay",
  "California State University, Northridge",
  "California State University, Sacramento",
  "California State University, San Bernardino",
  "California State University, San Marcos",
  "California State University, Stanislaus",
  "Carleton College",
  "Carnegie Mellon University",
  "Case Western Reserve University",
  "Central Michigan University",
  "Chapman University",
  "Claremont McKenna College",
  "Clemson University",
  "Cleveland State University",
  "Colby College",
  "Colgate University",
  "College of William & Mary",
  "Colorado School of Mines",
  "Colorado State University",
  "Columbia University",
  "Cornell University",
  "Dartmouth College",
  "Davidson College",
  "DePaul University",
  "Drexel University",
  "Duke University",
  "Duquesne University",
  "East Carolina University",
  "Eastern Michigan University",
  "Emory University",
  "Florida A&M University",
  "Florida Atlantic University",
  "Florida Institute of Technology",
  "Florida International University",
  "Florida State University",
  "Fordham University",
  "George Mason University",
  "George Washington University",
  "Georgetown University",
  "Georgia Institute of Technology",
  "Georgia State University",
  "Gonzaga University",
  "Grinnell College",
  "Hamilton College",
  "Harvard University",
  "Howard University",
  "Illinois Institute of Technology",
  "Indiana University Bloomington",
  "Indiana University Indianapolis",
  "Iowa State University",
  "Johns Hopkins University",
  "Kansas State University",
  "Kent State University",
  "Lehigh University",
  "Liberty University",
  "Louisiana State University",
  "Loyola Marymount University",
  "Loyola University Chicago",
  "Marquette University",
  "Massachusetts Institute of Technology",
  "Miami University",
  "Michigan State University",
  "Michigan Technological University",
  "Middlebury College",
  "Mississippi State University",
  "Montana State University",
  "Morehouse College",
  "Morgan State University",
  "New Jersey Institute of Technology",
  "New Mexico State University",
  "New York University",
  "North Carolina A&T State University",
  "North Carolina State University",
  "Northeastern University",
  "Northern Arizona University",
  "Northwestern University",
  "Ohio State University",
  "Ohio University",
  "Oklahoma State University",
  "Old Dominion University",
  "Oregon State University",
  "Pennsylvania State University",
  "Pepperdine University",
  "Pomona College",
  "Princeton University",
  "Purdue University",
  "Rensselaer Polytechnic Institute",
  "Rice University",
  "Rochester Institute of Technology",
  "Rutgers University",
  "Saint Louis University",
  "San Diego State University",
  "San Francisco State University",
  "San Jose State University",
  "Santa Clara University",
  "Savannah College of Art and Design",
  "Smith College",
  "Southern Methodist University",
  "Spelman College",
  "Stanford University",
  "Stony Brook University",
  "Syracuse University",
  "Temple University",
  "Texas A&M University",
  "Texas State University",
  "Texas Tech University",
  "The New School",
  "Tufts University",
  "Tulane University",
  "United States Air Force Academy",
  "United States Coast Guard Academy",
  "United States Military Academy",
  "United States Naval Academy",
  "University at Albany, SUNY",
  "University at Buffalo",
  "University of Akron",
  "University of Alabama",
  "University of Alabama at Birmingham",
  "University of Alaska Anchorage",
  "University of Alaska Fairbanks",
  "University of Arizona",
  "University of Arkansas",
  "University of California, Berkeley",
  "University of California, Davis",
  "University of California, Irvine",
  "University of California, Los Angeles",
  "University of California, Merced",
  "University of California, Riverside",
  "University of California, San Diego",
  "University of California, San Francisco",
  "University of California, Santa Barbara",
  "University of California, Santa Cruz",
  "University of Central Florida",
  "University of Chicago",
  "University of Cincinnati",
  "University of Colorado Boulder",
  "University of Colorado Denver",
  "University of Connecticut",
  "University of Dayton",
  "University of Delaware",
  "University of Denver",
  "University of Florida",
  "University of Georgia",
  "University of Hawaii at Manoa",
  "University of Houston",
  "University of Idaho",
  "University of Illinois Chicago",
  "University of Illinois Urbana-Champaign",
  "University of Iowa",
  "University of Kansas",
  "University of Kentucky",
  "University of Louisville",
  "University of Maine",
  "University of Maryland, Baltimore County",
  "University of Maryland, College Park",
  "University of Massachusetts Amherst",
  "University of Massachusetts Boston",
  "University of Memphis",
  "University of Miami",
  "University of Michigan",
  "University of Minnesota Twin Cities",
  "University of Mississippi",
  "University of Missouri",
  "University of Montana",
  "University of Nebraska-Lincoln",
  "University of Nevada, Las Vegas",
  "University of Nevada, Reno",
  "University of New Hampshire",
  "University of New Mexico",
  "University of North Carolina at Chapel Hill",
  "University of North Carolina at Charlotte",
  "University of North Texas",
  "University of Notre Dame",
  "University of Oklahoma",
  "University of Oregon",
  "University of Pennsylvania",
  "University of Pittsburgh",
  "University of Rhode Island",
  "University of Rochester",
  "University of San Diego",
  "University of San Francisco",
  "University of South Carolina",
  "University of South Florida",
  "University of Southern California",
  "University of Tennessee, Knoxville",
  "University of Texas at Arlington",
  "University of Texas at Austin",
  "University of Texas at Dallas",
  "University of Texas at San Antonio",
  "University of Toledo",
  "University of Tulsa",
  "University of Utah",
  "University of Vermont",
  "University of Virginia",
  "University of Washington",
  "University of Wisconsin-Madison",
  "University of Wyoming",
  "Utah State University",
  "Vanderbilt University",
  "Villanova University",
  "Virginia Commonwealth University",
  "Virginia Tech",
  "Wake Forest University",
  "Washington State University",
  "Washington University in St. Louis",
  "Wayne State University",
  "Wellesley College",
  "Wesleyan University",
  "West Virginia University",
  "Western Michigan University",
  "Williams College",
  "Worcester Polytechnic Institute",
  "Yale University"
];

const globalInstitutions = [
  "Australian National University",
  "Imperial College London",
  "King's College London",
  "McGill University",
  "Monash University",
  "National University of Singapore",
  "Technical University of Munich",
  "University College London",
  "University of Amsterdam",
  "University of Auckland",
  "University of British Columbia",
  "University of Cambridge",
  "University of Cape Town",
  "University of Edinburgh",
  "University of Melbourne",
  "University of Oxford",
  "University of Sydney",
  "University of Toronto",
  "University of Waterloo",
  "University of Zurich"
];

const mentors = [
  {id:"mentor-james", type:"Mentor", name:"James Njoroge", initials:"JN", country:"Kenya", headline:"Software Engineer at Google | Work Authorization and Career Mentor", role:"Google SWE, Seattle", rating:"4.9", reviews:42, price:"$30/hr", tags:["OPT/CPT","Career","Software Eng.","IU Alumni","Kenya"], skills:["System Design","Technical Interviews","Work Authorization Strategy","Sponsor Planning","Backend Engineering"], qualifications:["Google Software Engineer","IU Computer Science Alumni","Mentored 40+ international students"], education:["Indiana University - MS Computer Science"], experience:["Software Engineer, Google","Backend Engineer, Stripe internship"], bio:"Helped 40+ students navigate work authorization and land roles at top tech companies.", activity:["Hosted visa filing clinic for Kenyan students","Reviewed 12 resumes this month"]},
  {id:"mentor-sarah", type:"Mentor", name:"Sarah Mwangi", initials:"SM", country:"Kenya", headline:"Healthcare Analytics Specialist | Health Informatics Mentor", role:"Health Analytics, Chicago", rating:"4.8", reviews:31, price:"$25/hr", tags:["Health Informatics","OPT/CPT","IU Alumni","Kenya"], skills:["Clinical Data Analytics","SQL","Tableau","Health Informatics","Visa Applications"], qualifications:["IU Health Informatics Alumni","Healthcare analytics professional","Trusted by 18 students"], education:["Indiana University - MS Health Informatics"], experience:["Healthcare Analyst, Chicago Health Network","Graduate Research Assistant, IU"], bio:"IU Health Informatics grad working in healthcare analytics.", activity:["Answered questions on healthcare analytics hiring","Validated 3 Think Lab health ideas"]},
  {id:"mentor-amara", type:"Mentor", name:"Amara Osei", initials:"AO", country:"Ghana", headline:"Immigration Consultant for Global Students", role:"Immigration Consultant", rating:"4.7", reviews:19, price:"$20/hr", tags:["Immigration","CPT","OPT/CPT","GRE Prep"], skills:["Immigration Planning","Permit Review","Visa Review","Application Strategy","GRE Prep"], qualifications:["Immigration case advisor","Former international student advisor","Free first consultation"], education:["University of Ghana - BA Political Science"], experience:["Immigration Consultant","International Student Advisor"], bio:"Helps students navigate complex visa situations across destination countries.", activity:["Published permit risk checklist","Hosted visa Q&A for spring admits"]},
  {id:"mentor-raj", type:"Mentor", name:"Raj Kumar", initials:"RK", country:"India", headline:"Data Science Lead | STEM OPT and Interview Coach", role:"Data Science Lead, NYC", rating:"5.0", reviews:56, price:"$50/hr", tags:["Data Science","STEM OPT","H-1B","Interviews","India"], skills:["Machine Learning","Data Science Interviews","STEM OPT","Python","Hiring Strategy"], qualifications:["Data Science Lead","100+ student placements","Top-rated mentor"], education:["Purdue University - MS Data Science"], experience:["Data Science Lead, NYC Fintech","ML Engineer, Health AI startup"], bio:"Specializes in STEM OPT extensions and data science interview prep.", activity:["Ran mock interview cohort","Shared sponsor-friendly company list"]},
  {id:"mentor-peter", type:"Mentor", name:"Prof. Peter Waweru", initials:"PW", country:"Kenya", headline:"Lecturer and Research Mentor for Study Abroad Applicants", role:"UoN Lecturer", rating:"4.9", reviews:24, price:"Free", tags:["Application Guidance","Research","GRE","Free","Kenya"], skills:["Research Proposals","Statement of Purpose","GRE Planning","Academic References","Graduate Applications"], qualifications:["University lecturer","Research supervisor","Free mentorship"], education:["University of Nairobi - PhD Candidate"], experience:["Lecturer, University of Nairobi","Research Supervisor"], bio:"Guides students through applications, research proposals, and Kenya-to-abroad transitions.", activity:["Reviewed 8 statements of purpose","Matched applicants with research supervisors"]},
  {id:"mentor-lila", type:"Mentor", name:"Lila Nguyen", initials:"LN", country:"Vietnam", headline:"Product Manager | Career Switch and CPT Mentor", role:"Product Manager, Austin", rating:"4.6", reviews:14, price:"$35/hr", tags:["Product","CPT","Career Switch"], skills:["Product Strategy","CPT Planning","Career Switching","PM Interviews","Roadmapping"], qualifications:["Product manager in Austin","Career switch mentor","CPT project planning"], education:["UT Austin - MS Engineering Management"], experience:["Product Manager, SaaS Platform","Engineering Intern, Robotics startup"], bio:"Helps students find non-traditional career paths while maintaining status.", activity:["Created PM transition guide","Mentored CPT project candidates"]}
];

const students = [
  {id:"student-fredrick", type:"Student", name:"Fredrick Kamau", initials:"FK", country:"Kenya", headline:"MS Health Informatics Candidate | AI for GI Cancer Detection | International Student", role:"Indiana University Bloomington", tags:["Health Informatics","AI / Health","Research","Kenya","Work Eligible"], skills:["Python","Machine Learning","Clinical Data","Health Informatics","Research Design","SQL"], qualifications:["MS Health Informatics candidate","Think Lab idea validated by 3 mentors","Trusted by 3 mentors"], education:["Indiana University Bloomington - MS Health Informatics","University of Nairobi - Health Sciences foundation"], experience:["Graduate Research Project: GI cancer biomarker prediction","Community contributor on visa and arrival questions"], bio:"International student building practical health AI projects and helping other students navigate the global student journey.", activity:["Posted AI-powered GI cancer detection idea","Answered visa timeline question","Joined an origin-to-campus travel group"]},
  {id:"student-mercy", type:"Student", name:"Mercy Kamau", initials:"MK", country:"Kenya", headline:"Business Analytics Student | Visa Planning | Community Contributor", role:"IU Kelley School", tags:["Business Analytics","OPT/CPT","Kenya"], skills:["Excel","SQL","Analytics","Career Research"], qualifications:["Active community contributor","Fall 2025 visa planner"], education:["Indiana University - MS Business Analytics"], experience:["Graduate analytics project","Peer mentor for new Kenyan students"], bio:"Focused on analytics roles and documenting the visa planning process for peers.", activity:["Asked visa filing timing question","Saved mentor visa checklist"]},
  {id:"student-aisha", type:"Student", name:"Aisha Ndungu", initials:"AN", country:"Kenya", headline:"Data Analytics International Student | Sponsor Research | Job Search", role:"Purdue University", tags:["Jobs","Data Analytics","Kenya"], skills:["Python","Power BI","Data Visualization","Employer Research"], qualifications:["Community jobs researcher","Sponsor list contributor"], education:["Purdue University - MS Data Analytics"], experience:["Data dashboard capstone","Employer sponsorship research project"], bio:"Researching employer sponsorship patterns for international students in analytics.", activity:["Posted company sponsorship question","Compiled sponsor-friendly employer notes"]}
];

const studentMentors = [
  {id:"student-mentor-brian", type:"Student Mentor", name:"Brian Otieno", initials:"BO", country:"Kenya", headline:"Second-year MS CS Student | CPT Peer Mentor | Campus Onboarding Guide", role:"Indiana University Bloomington", rating:"4.8", reviews:16, price:"Free peer session", tags:["Student Mentor","Computer Science","CPT","Arrival","Kenya","Free"], skills:["CPT Planning","Course Selection","Campus Onboarding","Technical Interviews","Student Life"], qualifications:["Second-year graduate student","Completed CPT internship","Helped 25 new students settle in"], education:["Indiana University Bloomington - MS Computer Science"], experience:["Software Engineering Intern on CPT","Resident peer guide for new international students"], bio:"Advanced F-1 student helping newer students understand coursework, CPT timing, campus systems, and the first-year adjustment.", activity:["Hosted fall arrival office-hours","Reviewed course plans for 6 first-year students"]},
  {id:"student-mentor-nadia", type:"Student Mentor", name:"Nadia Hassan", initials:"NH", country:"Nigeria", headline:"Final-year Data Science Student | OPT Prep Peer Mentor", role:"Purdue University", rating:"4.7", reviews:11, price:"Free peer session", tags:["Student Mentor","Data Science","OPT/CPT","Jobs","Nigeria","Free"], skills:["OPT Prep","Resume Review","Data Science Projects","Internship Search","Peer Accountability"], qualifications:["Final-year MS student","Filed OPT successfully","Led data science study group"], education:["Purdue University - MS Data Science"], experience:["Data Science Intern","Graduate teaching assistant"], bio:"Final-year student mentor supporting newer F-1 students with OPT prep, project portfolios, and internship search habits.", activity:["Ran OPT document prep circle","Shared portfolio checklist for data students"]},
  {id:"student-mentor-lena", type:"Student Mentor", name:"Lena Kiptoo", initials:"LK", country:"Kenya", headline:"PhD Student | Research Methods and Academic Survival Mentor", role:"Ohio State University", rating:"4.9", reviews:9, price:"Free peer session", tags:["Student Mentor","Research","Academic Writing","Kenya","Free"], skills:["Research Methods","Academic Writing","Advisor Communication","Conference Prep","Grant Search"], qualifications:["PhD candidate","Published peer-reviewed research","Mentors early-stage graduate students"], education:["Ohio State University - PhD Education"], experience:["Graduate teaching associate","Research lab coordinator"], bio:"Advanced graduate student helping new international students navigate research expectations, advisor relationships, and academic writing.", activity:["Reviewed 4 research abstracts","Hosted academic writing accountability group"]}
];

const mentorMarketplace = [...studentMentors, ...mentors];
const people = [...students, ...studentMentors, ...mentors];

const profileDashboardData = {
  student: {
    metrics: [["82", "Work Days"], ["3", "Mentor Trusts"], ["12", "Community Contributions"], ["2", "Active Ideas"]],
    sections: [
      ["Journey Status", ["Student visa status active", "Permit planning in progress", "Arrival checklist partially complete"]],
      ["Portfolio Highlights", ["Think Lab idea submitted", "Research project documented", "Community answers visible to mentors"]],
      ["Next Best Actions", ["Confirm visa or permit filing window with school advisor", "Request mentor review of resume", "Add project evidence to profile"]],
      ["Recommended Connections", ["Health Informatics mentor", "Origin-to-campus travel group", "Sponsor-aware job search peer"]]
    ]
  },
  mentor: {
    metrics: [["42", "Reviews"], ["4.9", "Rating"], ["28", "Trusted Students"], ["6", "Open Sessions"]],
    sections: [
      ["Mentor Operations", ["Upcoming student sessions", "Unread student questions", "Profile booking rate"]],
      ["Expertise Signals", ["Verified qualifications", "Top skills and specialties", "Student outcomes and testimonials"]],
      ["Mentee Pipeline", ["Students needing visa or permit help", "Students matching field expertise", "Free first-call requests"]],
      ["Reputation Growth", ["Answer pinned community questions", "Validate Think Lab ideas", "Publish a short guidance note"]]
    ]
  },
  studentMentor: {
    metrics: [["16", "Peer Reviews"], ["4.8", "Peer Rating"], ["25", "Students Helped"], ["4", "Open Circles"]],
    sections: [
      ["Peer Mentor Focus", ["Guide new students through first-year decisions", "Share lived experience from advanced coursework", "Escalate complex visa or permit issues to verified mentors"]],
      ["Current Support Circles", ["Arrival and campus onboarding", "Work authorization readiness and course planning", "Resume and portfolio peer review"]],
      ["Mentee Pipeline", ["New admits from same country", "Students in same program", "First-year students asking repeat questions"]],
      ["Growth Path", ["Earn mentor trust badges", "Document outcomes", "Graduate into verified alumni mentor status"]]
    ]
  }
};

const basePosts = [
  {author:"Mercy Kamau", initials:"MK", topic:"Visa/Permit", time:"2h ago", q:"How early should I file my visa or work authorization application?", body:"I graduate soon and I am confused about when exactly to submit my next immigration step.", answers:14, helpful:23},
  {author:"Daniel Mwenda", initials:"DM", topic:"Arrival", time:"5h ago", q:"Best SIM card to get when you land at Indianapolis airport?", body:"Arriving at IND airport in August. Should I buy at the airport or wait for a carrier store?", answers:8, helpful:15},
  {author:"Aisha Ndungu", initials:"AN", topic:"Jobs", time:"Yesterday", q:"Which employers are known to sponsor international graduates?", body:"I want to apply to companies that actually support international students across destination countries.", answers:31, helpful:87},
  {author:"Joyce Oloo", initials:"JO", topic:"Housing", time:"2 days ago", q:"Affordable housing near IU Bloomington for a grad student?", body:"Looking for a shared apartment within walking or biking distance of campus.", answers:19, helpful:44}
];

const travelGroups = [
  {country:"Kenya", university:"Indiana University", route:"Nairobi (NBO) -> Chicago (ORD) -> Bloomington", date:"2025-08-10", intake:"Fall 2025", members:3, spots:2, note:"Flying Kenya Airways via London and sharing a ride from Chicago to Bloomington."},
  {country:"Nigeria", university:"Purdue University", route:"Lagos (LOS) -> New York (JFK) -> West Lafayette", date:"2025-08-14", intake:"Fall 2025", members:2, spots:3, note:"One night layover in NYC, then car rental to Purdue."},
  {country:"Ghana", university:"Ohio State", route:"Accra (ACC) -> Atlanta (ATL) -> Columbus", date:"2025-08-08", intake:"Fall 2025", members:4, spots:1, note:"Almost full. One more person for the shuttle to Columbus."},
  {country:"Ethiopia", university:"University of Minnesota Twin Cities", route:"Addis Ababa (ADD) -> Chicago (ORD) -> Minneapolis", date:"2025-08-11", intake:"Fall 2025", members:2, spots:3, note:"Planning an ORD meetup before final domestic connection to Minneapolis."},
  {country:"South Africa", university:"University of Texas at Austin", route:"Johannesburg (JNB) -> Atlanta (ATL) -> Austin", date:"2025-08-13", intake:"Fall 2025", members:3, spots:2, note:"Coordinating baggage help and rideshare from AUS to campus housing."},
  {country:"Egypt", university:"University of Illinois Urbana-Champaign", route:"Cairo (CAI) -> Frankfurt (FRA) -> Chicago (ORD) -> Champaign", date:"2025-08-09", intake:"Fall 2025", members:2, spots:2, note:"Looking for students to split ground transport from Chicago to Champaign."},
  {country:"Cameroon", university:"University of Maryland, College Park", route:"Douala (DLA) -> Paris (CDG) -> Washington, DC", date:"2025-08-15", intake:"Fall 2025", members:2, spots:4, note:"Planning a Dulles airport pickup pool for Maryland students."},
  {country:"Rwanda", university:"Carnegie Mellon University", route:"Kigali (KGL) -> Doha (DOH) -> Pittsburgh", date:"2025-08-12", intake:"Fall 2025", members:1, spots:3, note:"Open group for CMU and Pittsburgh-area students arriving the same week."},
  {country:"Senegal", university:"New York University", route:"Dakar (DSS) -> New York (JFK)", date:"2025-08-16", intake:"Fall 2025", members:3, spots:2, note:"Direct JFK arrival group coordinating temporary housing and SIM setup."},
  {country:"India", university:"University of Toronto", route:"Delhi (DEL) -> Toronto (YYZ)", date:"2025-08-18", intake:"Fall 2025", members:5, spots:3, note:"Coordinating study permit document checks and airport arrival in Toronto."},
  {country:"Brazil", university:"University of Edinburgh", route:"Sao Paulo (GRU) -> London (LHR) -> Edinburgh", date:"2025-09-03", intake:"Fall 2025", members:2, spots:4, note:"UK-bound students sharing CAS, housing, and arrival checklist notes."},
  {country:"Vietnam", university:"University of Melbourne", route:"Ho Chi Minh City (SGN) -> Singapore (SIN) -> Melbourne", date:"2026-02-10", intake:"Spring 2026", members:4, spots:2, note:"Australia arrival group for SIM setup, temporary housing, and campus check-in."},
  {country:"Turkey", university:"Technical University of Munich", route:"Istanbul (IST) -> Munich (MUC)", date:"2025-10-01", intake:"Fall 2025", members:3, spots:3, note:"Germany-bound group coordinating residence registration and student insurance."}
];

const ideas = [
  {cat:"Health", title:"AI-powered GI Cancer Early Detection using Biomarkers", body:"ML models trained on clinical biomarker data to predict GI cancer risk in low-resource settings.", author:"Fredrick K.", validation:3, status:"Promising"},
  {cat:"AI / Tech", title:"International Student OS - F1Flow", body:"A unified platform connecting international students across visas, permits, mentorship, travel, arrival, community, and innovation.", author:"Fredrick K.", validation:5, status:"Scalable"},
  {cat:"Fintech", title:"Credit Builder App for International Students", body:"Guidance for banking, phone plans, credit-building options, and financial identity after arrival in a new country.", author:"Amara M.", validation:2, status:"Needs MVP"},
  {cat:"Social Impact", title:"Diaspora Mentorship Network for Global Students", body:"Structured mentorship between diaspora professionals and students aspiring to study anywhere in the world.", author:"Temi O.", validation:4, status:"High Impact"},
  {cat:"Education", title:"Peer Tutoring Platform for International Students", body:"Matches new arrivals with tutors who understand different destination-country academic expectations.", author:"Lena K.", validation:0, status:"Awaiting validation"}
];

const services = [
  {tab:"Housing", title:"IU Campus Living", meta:"On campus", rating:"4.1", body:"Graduate housing within walking distance of core campus facilities."},
  {tab:"Housing", title:"Graduate Apartments", meta:"0.5 mi", rating:"4.8", body:"Furnished studios popular with international graduate students."},
  {tab:"Housing", title:"Student Sublets", meta:"0.3 mi", rating:"4.4", body:"Short-term rooms from current students leaving for summer."},
  {tab:"Transport", title:"Airport Pickup Pool", meta:"IND and ORD", rating:"4.7", body:"Coordinate shared rides from Indianapolis or Chicago to Bloomington."},
  {tab:"Food & Grocery", title:"First Grocery Run", meta:"Community", rating:"4.6", body:"Find student hosts going to international grocery stores after arrival."},
  {tab:"Banking & SIM", title:"Banking Starter Pack", meta:"First week", rating:"4.5", body:"Compare student checking accounts, SIM plans, and campus-friendly branches."},
  {tab:"Healthcare", title:"Insurance Check", meta:"Campus", rating:"4.3", body:"Track health insurance enrollment and where to get care."},
  {tab:"Student Hosts", title:"Host a Student", meta:"Trusted", rating:"4.9", body:"Current students offer temporary support for new arrivals."}
];

function loadState() {
  if (window.F1FlowDatabase) return normalizeState(window.F1FlowDatabase.getState(defaults));

  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return structuredClone(defaults);
  const parsed = JSON.parse(saved);
  return normalizeState({
    ...structuredClone(defaults),
    ...parsed,
    profile: {...defaults.profile, ...(parsed.profile || {})},
    checklist: {...defaults.checklist, ...(parsed.checklist || {})},
    recommendationRequests: {...defaults.recommendationRequests, ...(parsed.recommendationRequests || {})}
  });
}

function normalizeState(nextState) {
  if (nextState.profile?.status === "Current F-1 Student") nextState.profile.status = "Current International Student";
  if (nextState.checklist?.["Campus check-in and I-20"] !== undefined) {
    nextState.checklist["Campus check-in and student documents"] = nextState.checklist["Campus check-in and I-20"];
    delete nextState.checklist["Campus check-in and I-20"];
  }
  nextState.posts ||= [];
  nextState.ideas ||= [];
  nextState.actionLog ||= [];
  nextState.savedPosts ||= [];
  nextState.travelMemberships ||= [];
  nextState.travelMatches ||= [];
  nextState.mentorRequests ||= [];
  nextState.serviceViews ||= [];
  return nextState;
}

function saveState() {
  if (window.F1FlowDatabase) {
    window.F1FlowDatabase.setState(state);
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function toast(message) {
  const node = $("#toast");
  node.textContent = message;
  node.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => node.classList.remove("show"), 2600);
}

function logAction(type, label) {
  state.actionLog.unshift({type, label, time: new Date().toISOString()});
  state.actionLog = state.actionLog.slice(0, 25);
  saveState();
}

function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return [...document.querySelectorAll(selector)];
}

function exists(selector) {
  return Boolean($(selector));
}

function showPage(id) {
  const pageRoutes = {
    home: "index.html",
    profiles: "profiles.html",
    mentors: "profiles.html#mentors",
    "profile-dashboard": "profiles.html#profile-dashboard",
    dashboard: "dashboard.html",
    travel: "dashboard.html#travel",
    arrival: "dashboard.html#arrival",
    community: "community.html",
    thinklab: "thinklab.html",
    login: "login.html"
  };

  if (!exists(`#page-${id}`) && pageRoutes[id]) {
    window.location.href = pageRoutes[id];
    return;
  }

  $all(".page").forEach(page => page.classList.toggle("active", page.id === `page-${id}`));
  $all(".nav-link").forEach(btn => btn.classList.toggle("active", btn.dataset.page === id));
  window.scrollTo({top: 0, behavior: "smooth"});
}

function showProfile(id) {
  selectedProfileId = id;
  renderProfiles();
  showPage("profiles");
}

function showProfileDashboard(id) {
  selectedDashboardProfileId = id;
  renderProfileDashboard();
  showPage("profile-dashboard");
}

function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.dataset.theme = theme;
  $all(".theme-option").forEach(btn => btn.classList.toggle("active", btn.dataset.theme === theme));
  saveState();
}

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join("").toUpperCase() || "FS";
}

function monthLabel(value) {
  const date = new Date(`${value}-01T12:00:00`);
  return date.toLocaleDateString(undefined, {month: "short", year: "numeric"});
}

function graduationDate() {
  return new Date(`${state.profile.graduation}-15T12:00:00`);
}

function optWindow() {
  const grad = graduationDate();
  const open = new Date(grad);
  open.setDate(open.getDate() - 90);
  const close = new Date(grad);
  close.setDate(close.getDate() + 60);
  return {open, close, grad};
}

function daysBetween(a, b) {
  return Math.ceil((b - a) / 86400000);
}

function renderDashboard() {
  if (!exists("#dashboard-initials")) return;
  const profile = state.profile;
  const now = new Date();
  const {open, close, grad} = optWindow();
  const daysToClose = daysBetween(now, close);
  const totalWindow = Math.max(1, daysBetween(open, close));
  const elapsed = Math.min(totalWindow, Math.max(0, daysBetween(open, now)));
  const percent = Math.round((elapsed / totalWindow) * 100);

  $("#dashboard-initials").textContent = initials(profile.name);
  $("#dashboard-name").textContent = `Welcome back, ${profile.name.split(" ")[0]}`;
  $("#dashboard-summary").textContent = `${profile.university} · ${profile.field} · Student visa`;
  $("#program-start").textContent = `Program Start: ${monthLabel(profile.programStart)}`;
  $("#opt-deadline").textContent = `Visa Deadline: ${close.toLocaleDateString(undefined, {month:"short", day:"numeric", year:"numeric"})}`;
  $("#countdown-num").textContent = Math.max(0, daysToClose);
  $("#countdown-label").textContent = daysToClose >= 0 ? "days until visa application window closes" : "visa filing window has closed";
  $("#timeline-fill").style.width = `${percent}%`;

  const steps = [
    ["done", "Enrollment and student documents issued", `Completed ${monthLabel(profile.programStart)}`],
    ["done", "Completed first eligibility milestone", "Work authorization or permit planning checkpoint"],
    [now >= open && now <= close ? "active" : now > close ? "done" : "todo", "File visa or work authorization application", `Window: ${open.toLocaleDateString()} - ${close.toLocaleDateString()}`],
    [now > grad ? "active" : "todo", "Receive approval document", "Processing varies by country and case"],
    [now > grad ? "active" : "todo", "Begin approved work or next step", "Track local compliance requirements carefully"]
  ];
  $("#timeline-steps").innerHTML = steps.map(([status, title, sub], i) => `<div class="step ${status}"><b>${status === "done" ? "✓" : i + 1}</b><p>${title}<span>${sub}</span></p></div>`).join("");

  $("#alerts").innerHTML = [
    daysToClose >= 0 ? ["warn", "Visa Application Window", `You have ${daysToClose} days to submit your next visa or permit step.`, "Review checklist"] : ["warn", "Visa Window Closed", "Check with your school advisor before taking action.", "Contact advisor"],
    ["info", "Work Authorization", "You have tracked 82 work days. Rules vary by destination country and visa type.", "View rules"],
    ["info", "Travel Group Found", `${travelGroups.filter(g => g.country === profile.country).length || 1} possible travel group match for your country.`, "Open travel"]
  ].map(([type, title, body, action]) => `<div class="alert ${type}"><div><strong>${title}</strong><p>${body}</p></div><button class="btn small secondary" data-action="alert" data-label="${title}">${action}</button></div>`).join("");
}

function renderModules() {
  if (!exists("#module-grid")) return;
  $("#module-grid").innerHTML = modules.map(([title, body, tag, page]) => `
    <article class="module-card">
      <h3>${title}</h3>
      <p>${body}</p>
      <span class="tag">${tag}</span>
      <button class="btn small secondary" data-page="${page}">Open</button>
    </article>
  `).join("");
}

function renderUniversityOptions() {
  if (!exists("#us-universities")) return;
  const knownUniversities = [
    ...globalInstitutions,
    ...usUniversities,
    ...travelGroups.map(group => group.university),
    ...(state.travelMatches || []).map(group => group.university),
    state.profile.university
  ];
  const unique = [...new Set(knownUniversities.filter(Boolean))].sort((a, b) => a.localeCompare(b));
  $("#us-universities").innerHTML = unique.map(name => `<option value="${name}"></option>`).join("");
}

function renderCountryOptions() {
  if (!exists("#african-countries")) return;
  const knownCountries = [
    ...worldCountries,
    ...africanCountries,
    ...travelGroups.map(group => group.country),
    ...(state.travelMatches || []).map(group => group.country),
    ...people.map(person => person.country),
    state.profile.country
  ];
  const unique = [...new Set(knownCountries.filter(Boolean))].sort((a, b) => a.localeCompare(b));
  $("#african-countries").innerHTML = unique.map(name => `<option value="${name}"></option>`).join("");
}

function renderMentors() {
  if (!exists("#mentor-filters") && !exists("#matched-mentors")) return;
  const filters = ["All", "Student Mentor", "Visa/Permit", "Career", "Health Informatics", "Free", "Kenya", "India"];
  if (exists("#mentor-filters")) $("#mentor-filters").innerHTML = filters.map(f => `<button class="chip ${f === activeMentorFilter ? "active" : ""}" data-mentor-filter="${f}">${f}</button>`).join("");
  const q = $("#mentor-search")?.value?.trim().toLowerCase() || "";
  const list = mentorMarketplace.filter(m => {
    const haystack = `${m.name} ${m.type} ${m.country} ${m.role} ${m.tags.join(" ")} ${m.bio}`.toLowerCase();
    const matchesSearch = !q || haystack.includes(q);
    const matchesFilter = activeMentorFilter === "All" ||
      m.type === activeMentorFilter ||
      m.tags.includes(activeMentorFilter) ||
      (activeMentorFilter === "Visa/Permit" && m.tags.some(tag => ["OPT/CPT", "CPT", "STEM OPT", "H-1B", "Immigration"].includes(tag))) ||
      m.country === activeMentorFilter ||
      (activeMentorFilter === "Free" && m.price.toLowerCase().includes("free"));
    return matchesSearch && matchesFilter;
  });
  if (exists("#mentors-grid")) $("#mentors-grid").innerHTML = list.length ? list.map(mentorCard).join("") : `<div class="empty">No mentors match that filter yet.</div>`;
  if (exists("#matched-mentors")) $("#matched-mentors").innerHTML = mentorMarketplace.slice(0, 3).map(m => `<div class="mini-item"><button class="card-avatar avatar-button" data-profile="${m.id}">${m.initials}</button><div><button class="text-link" data-profile="${m.id}">${m.name}</button><p>${m.type} · ${m.role}</p></div><button class="btn small primary" data-profile="${m.id}">View</button></div>`).join("");
}

function mentorCard(m) {
  const action = m.type === "Student Mentor" ? "Request Peer Help" : `Book ${m.price}`;
  return `<article class="card">
    <div class="card-head"><button class="card-avatar avatar-button" data-profile="${m.id}">${m.initials}</button><div><span class="pill">${m.type}</span><h3><button class="text-link title-link" data-profile="${m.id}">${m.name}</button></h3><p>${m.headline}</p><p>★★★★★ ${m.rating} (${m.reviews} reviews)</p></div></div>
    <div class="tags">${m.tags.map(t => `<span class="tag">${t}</span>`).join("")}</div>
    <p>${m.bio}</p>
    <div class="card-actions"><button class="btn small primary" data-action="mentor-request" data-mentor-id="${m.id}" data-label="${m.name}">${action}</button><button class="btn small secondary" data-profile="${m.id}">View Profile</button></div>
  </article>`;
}

function renderProfiles() {
  if (!exists("#profile-directory") || !exists("#profile-detail")) return;
  const filters = ["All", "Students", "Student Mentors", "Mentors", "Kenya", "Health Informatics", "Visa/Permit", "Data Science"];
  $("#profile-filters").innerHTML = filters.map(f => `<button class="chip ${f === activeProfileFilter ? "active" : ""}" data-profile-filter="${f}">${f}</button>`).join("");
  const pendingSearch = sessionStorage.getItem("f1flow.pendingSearch");
  if (pendingSearch && exists("#profile-search")) {
    $("#profile-search").value = pendingSearch;
    sessionStorage.removeItem("f1flow.pendingSearch");
  }
  const query = $("#profile-search")?.value?.trim().toLowerCase() || "";
  const list = people.filter(person => {
    const haystack = `${person.name} ${person.type} ${person.country} ${person.headline} ${person.role} ${person.tags.join(" ")} ${person.skills.join(" ")}`.toLowerCase();
    const matchesSearch = !query || haystack.includes(query);
    const matchesFilter = activeProfileFilter === "All" ||
      (activeProfileFilter === "Students" && person.type === "Student") ||
      (activeProfileFilter === "Student Mentors" && person.type === "Student Mentor") ||
      (activeProfileFilter === "Mentors" && person.type === "Mentor") ||
      person.country === activeProfileFilter ||
      person.tags.includes(activeProfileFilter) ||
      (activeProfileFilter === "Visa/Permit" && person.tags.some(tag => ["OPT/CPT", "CPT", "STEM OPT", "H-1B", "Immigration"].includes(tag))) ||
      person.skills.includes(activeProfileFilter);
    return matchesSearch && matchesFilter;
  });
  if (!list.some(person => person.id === selectedProfileId)) selectedProfileId = list[0]?.id || people[0].id;
  $("#profile-directory").innerHTML = list.length ? list.map(profileDirectoryItem).join("") : `<div class="empty">No profiles match that search.</div>`;
  const person = people.find(p => p.id === selectedProfileId) || people[0];
  $("#profile-detail").innerHTML = profileDetail(person);
}

function profileDirectoryItem(person) {
  return `<button class="directory-item ${person.id === selectedProfileId ? "active" : ""}" data-profile="${person.id}">
    <span class="card-avatar">${person.initials}</span>
    <span><strong>${person.name}</strong><small>${person.type} · ${person.role}</small><em>${person.country}</em></span>
  </button>`;
}

function profileDetail(person) {
  const isMentor = person.type === "Mentor";
  const isStudentMentor = person.type === "Student Mentor";
  const primaryAction = isMentor ? `Book ${person.price}` : isStudentMentor ? "Request Peer Help" : "View Journey";
  const connectionLabel = isMentor ? `${person.reviews} reviews` : isStudentMentor ? `${person.reviews} peer reviews` : "3 mentor trusts";
  const availability = isMentor ? person.price : isStudentMentor ? "Free peer support" : "Open to mentors";
  const matchedMentors = mentors.filter(mentor =>
    mentor.country === person.country ||
    mentor.tags.some(tag => person.tags.includes(tag)) ||
    mentor.skills.some(skill => person.skills.includes(skill))
  ).slice(0, 2);
  const isTab = tab => activeProfileTab === tab;
  return `<section class="profile-hero-card panel">
    <div class="profile-cover"></div>
    <div class="profile-main">
      <div class="profile-avatar">${person.initials}</div>
      <div class="profile-actions">
        <button class="btn small secondary" data-action="${isMentor || isStudentMentor ? "message" : "connect"}" data-label="${person.name}">${isMentor || isStudentMentor ? "Message" : "Connect"}</button>
        <button class="btn small secondary" data-profile-dashboard="${person.id}">Dashboard</button>
        <button class="btn small primary" data-action="${isMentor || isStudentMentor ? "mentor-request" : "journey-view"}" data-mentor-id="${person.id}" data-label="${person.name}">${primaryAction}</button>
      </div>
      <h2>${person.name}</h2>
      <p class="profile-headline">${person.headline}</p>
      <p class="profile-meta">${person.country} · ${person.role}</p>
      <div class="profile-stats">
        <span><strong>${person.skills.length}</strong> skills</span>
        <span><strong>${person.qualifications.length}</strong> qualifications</span>
        <span><strong>${person.activity.length}</strong> recent activities</span>
        <span><strong>${isMentor || isStudentMentor ? person.rating : "3"}</strong> ${isMentor || isStudentMentor ? "rating" : "mentor trusts"}</span>
      </div>
    </div>
    <nav class="profile-tabs" aria-label="Profile sections">
      <button class="${activeProfileTab === "overview" ? "active" : ""}" data-profile-tab="overview">Overview</button>
      <button class="${activeProfileTab === "activity" ? "active" : ""}" data-profile-tab="activity">Activity</button>
      <button class="${activeProfileTab === "experience" ? "active" : ""}" data-profile-tab="experience">Experience</button>
      <button class="${activeProfileTab === "recommendations" ? "active" : ""}" data-profile-tab="recommendations">Recommendations</button>
    </nav>
  </section>
  <div class="profile-content-grid">
    <aside class="profile-sidebar ${isTab("overview") ? "" : "is-hidden"}" data-profile-section="overview">
      <section class="panel profile-section">
        <h3>About</h3>
        <p>${person.bio}</p>
      </section>
      <section class="panel profile-section">
        <h3>Profile Highlights</h3>
        <div class="profile-highlight-list">
          <span>${person.type}</span>
          <span>${availability}</span>
          <span>${connectionLabel}</span>
          <span>${person.country}</span>
        </div>
      </section>
      <section class="panel profile-section">
        <h3>Skills</h3>
        <div class="skill-list">${person.skills.map(skill => `<span>${skill}</span>`).join("")}</div>
      </section>
    </aside>
    <section class="profile-main-feed">
      <article class="panel profile-section profile-feed-card ${isTab("activity") ? "" : "is-hidden"}" data-profile-section="activity">
        <div class="post-author">
          <div class="card-avatar">${person.initials}</div>
          <div>
            <strong>${person.name}</strong>
            <span>${person.type} · Recently active</span>
          </div>
        </div>
        <p>${person.activity[0]}</p>
        <div class="post-actions"><button data-action="recommend" data-label="${person.name} activity">Recommend</button><button data-action="comment" data-label="${person.name} activity">Comment</button><button data-action="save" data-label="${person.name} activity">Save</button></div>
      </article>
      <section class="panel profile-section ${isTab("experience") ? "" : "is-hidden"}" data-profile-section="experience">
        <h3>Experience</h3>
        ${profileTimeline(person.experience)}
      </section>
      <section class="panel profile-section ${isTab("experience") ? "" : "is-hidden"}" data-profile-section="experience">
        <h3>Education</h3>
        ${profileTimeline(person.education)}
      </section>
      <section class="panel profile-section ${isTab("overview") ? "" : "is-hidden"}" data-profile-section="overview">
        <h3>Qualifications</h3>
        ${profileBullets(person.qualifications)}
      </section>
      ${person.type === "Student" ? `<section class="panel profile-section ${isTab("recommendations") ? "" : "is-hidden"}" data-profile-section="recommendations">
        <h3>Recommended Mentors</h3>
        <div class="recommendation-list">
          ${matchedMentors.map(mentor => `<div class="recommendation-item"><button class="card-avatar avatar-button" data-profile="${mentor.id}">${mentor.initials}</button><div><button class="text-link" data-profile="${mentor.id}">${mentor.name}</button><p>${mentor.headline}</p></div><button class="btn small secondary" data-profile="${mentor.id}">View</button></div>`).join("")}
        </div>
      </section>` : ""}
      <section class="panel profile-section ${isTab("activity") ? "" : "is-hidden"}" data-profile-section="activity">
        <h3>Recent Activity</h3>
        ${profileBullets(person.activity)}
      </section>
    </section>
  </div>`;
}

function profileBullets(items) {
  return `<div class="profile-list">${items.map(item => `<p>${item}</p>`).join("")}</div>`;
}

function profileTimeline(items) {
  return `<div class="profile-timeline">${items.map(item => `<div><b></b><p>${item}</p></div>`).join("")}</div>`;
}

function renderProfileDashboard() {
  if (!exists("#profile-dashboard-content")) return;
  const person = people.find(p => p.id === selectedDashboardProfileId) || people[0];
  const isMentor = person.type === "Mentor";
  const isStudentMentor = person.type === "Student Mentor";
  const config = isMentor ? profileDashboardData.mentor : isStudentMentor ? profileDashboardData.studentMentor : profileDashboardData.student;
  const recommendationPanel = person.type === "Student" ? renderRecommendationPanel(person) : "";
  $("#profile-dashboard-title").textContent = `${person.name}'s Dashboard`;
  $("#profile-dashboard-subtitle").textContent = isMentor
    ? "Mentor workspace for sessions, expertise, reputation, and mentee pipeline."
    : isStudentMentor
    ? "Peer mentor workspace for student circles, onboarding support, and growth toward verified mentor status."
    : "Student workspace for journey progress, portfolio, mentors, and next actions.";
  $("#profile-dashboard-content").innerHTML = `
    <section class="panel profile-dashboard-hero">
      <div class="card-avatar">${person.initials}</div>
      <div>
        <span class="pill">${person.type}</span>
        <h3>${person.headline}</h3>
        <p>${person.bio}</p>
      </div>
      <button class="btn small primary" data-profile="${person.id}">View Public Profile</button>
    </section>
    <section class="profile-dashboard-metrics">
      ${config.metrics.map(([num, label]) => `<article class="metric"><strong>${num}</strong><span>${label}</span></article>`).join("")}
    </section>
    <section class="profile-dashboard-grid">
      ${config.sections.map(([title, items]) => `<article class="panel dashboard-section-card"><h3>${title}</h3>${profileBullets(items)}</article>`).join("")}
      ${recommendationPanel}
      <article class="panel dashboard-section-card wide">
        <h3>Profile Strength</h3>
        <div class="strength-row"><span>Skills</span><b style="--w:${Math.min(100, person.skills.length * 14)}%"></b></div>
        <div class="strength-row"><span>Qualifications</span><b style="--w:${Math.min(100, person.qualifications.length * 24)}%"></b></div>
        <div class="strength-row"><span>Activity</span><b style="--w:${Math.min(100, person.activity.length * 28)}%"></b></div>
      </article>
    </section>`;
}

function renderRecommendationPanel(student) {
  const trustedMentors = mentors.filter(mentor =>
    mentor.country === student.country ||
    mentor.tags.some(tag => student.tags.includes(tag)) ||
    mentor.skills.some(skill => student.skills.includes(skill))
  ).slice(0, 3);
  const requested = state.recommendationRequests[student.id] || [];
  return `<article class="panel dashboard-section-card wide recommendation-panel">
    <div class="section-heading-row">
      <div>
        <h3>Request Recommendation</h3>
        <p>Ask a trusted mentor to write a recommendation based on your profile, activity, and skills.</p>
      </div>
      <span class="pill">${requested.length} requested</span>
    </div>
    <div class="recommendation-list">
      ${trustedMentors.map(mentor => {
        const hasRequested = requested.includes(mentor.id);
        return `<div class="recommendation-item">
          <button class="card-avatar avatar-button" data-profile="${mentor.id}">${mentor.initials}</button>
          <div>
            <button class="text-link" data-profile="${mentor.id}">${mentor.name}</button>
            <p>${mentor.headline}</p>
          </div>
          <button class="btn small ${hasRequested ? "secondary" : "primary"}" data-request-recommendation="${student.id}" data-mentor-id="${mentor.id}">
            ${hasRequested ? "Requested" : "Request"}
          </button>
        </div>`;
      }).join("")}
    </div>
  </article>`;
}

function renderCommunity() {
  if (!exists("#posts")) return;
  const topics = ["All Topics", "Visa/Permit", "Arrival", "Jobs", "Housing", "Life Tips"];
  $("#post-filters").innerHTML = topics.map(t => `<button class="chip ${t === activePostFilter ? "active" : ""}" data-post-filter="${t}">${t}</button>`).join("");
  const allPosts = [...state.posts, ...basePosts];
  const posts = activePostFilter === "All Topics" ? allPosts : allPosts.filter(p => p.topic === activePostFilter);
  $("#posts").innerHTML = posts.map(p => `<article class="post-card">
    <div class="post-meta"><button class="card-avatar avatar-button" style="width:34px;height:34px" data-profile="${profileIdForAuthor(p.author)}">${p.initials}</button><button class="text-link" data-profile="${profileIdForAuthor(p.author)}">${p.author}</button><span>${p.topic}</span><span>${p.time}</span></div>
    <h3>${p.q}</h3><p>${p.body}</p>
    <div class="post-actions"><span>${p.answers} answers</span><span>${p.helpful} helpful</span><button data-action="save" data-label="${p.q}">Save</button></div>
  </article>`).join("");
}

function profileIdForAuthor(author) {
  return people.find(person => author.startsWith(person.name.split(" ")[0]) || person.name === author)?.id || "student-fredrick";
}

function renderTravel() {
  if (!exists("#travel-groups")) return;
  $("#travel-country").value ||= state.profile.country || "Kenya";
  $("#travel-university").value ||= state.profile.university || "Indiana University Bloomington";
  $("#travel-date").value ||= "2025-08-10";
  $("#create-country").value ||= $("#travel-country").value;
  $("#create-university").value ||= $("#travel-university").value;
  $("#create-date").value ||= $("#travel-date").value;

  const userMatches = (state.travelMatches || []).map(group => ({...group, source: "Created by you"}));
  const sampleMatches = travelGroups.map(group => ({...group, source: "Community match"}));
  const allGroups = [...userMatches, ...sampleMatches];
  const list = allGroups.filter(group => {
    if (!travelSearch) return true;
    const sameCountry = group.country.toLowerCase() === travelSearch.country.toLowerCase();
    const sameInstitution = group.university.toLowerCase().includes(travelSearch.university.toLowerCase()) || travelSearch.university.toLowerCase().includes(group.university.toLowerCase());
    const sameIntake = group.intake === travelSearch.intake;
    return sameCountry && sameInstitution && sameIntake;
  });
  const title = travelSearch ? `${travelSearch.country} to ${travelSearch.university}` : "Travel groups you can join";

  if (exists("#travel-results-title")) $("#travel-results-title").textContent = title;
  if (exists("#travel-results-count")) $("#travel-results-count").textContent = `${list.length} match${list.length === 1 ? "" : "es"}`;
  $("#travel-groups").innerHTML = list.length ? list.map(travelCard).join("") : `<div class="empty travel-empty">
    <strong>No exact match yet.</strong>
    <span>Create the first group for this route so other students can join you.</span>
    <button class="btn small primary" data-action="focus-create-travel" data-label="Create travel match">Create Travel Match</button>
  </div>`;
}

function travelCard(group) {
  const label = `${group.country} to ${group.university}`;
  const joined = state.travelMemberships.includes(label);
  return `<article class="card travel-card">
    <div class="travel-card-top"><span class="pill">${group.source}</span><span>${joined ? "Joined" : `${group.spots} spots left`}</span></div>
    <h3>${group.country} -> ${group.university}</h3>
    <p class="route">${group.route}</p>
    <div class="travel-match-meta">
      <span>${group.date}</span>
      <span>${group.intake}</span>
      <span>${group.members} member${group.members === 1 ? "" : "s"}</span>
    </div>
    <p>${group.note}</p>
    <div class="card-actions">
      <button class="btn small primary" data-action="join-travel" data-label="${label}">${joined ? "Joined" : "Join Group"}</button>
      <button class="btn small secondary" data-action="travel-chat" data-label="${label}">Chat</button>
    </div>
  </article>`;
}

function renderThinkLab() {
  if (!exists("#ideas-grid")) return;
  const filters = ["All Ideas", "AI / Tech", "Health", "Fintech", "Social Impact", "Education", "Validated"];
  $("#idea-filters").innerHTML = filters.map(f => `<button class="chip ${f === activeIdeaFilter ? "active" : ""}" data-idea-filter="${f}">${f}</button>`).join("");
  const allIdeas = [...state.ideas, ...ideas];
  const list = allIdeas.filter(i => activeIdeaFilter === "All Ideas" || i.cat === activeIdeaFilter || (activeIdeaFilter === "Validated" && i.validation > 0));
  $("#ideas-grid").innerHTML = list.map(i => `<article class="card"><span class="pill">${i.cat}</span><h3>${i.title}</h3><p>${i.body}</p><p>Validated by <strong>${i.validation}</strong> mentors · ${i.status}</p><div class="card-actions"><button class="btn small secondary" data-action="collaborate" data-label="${i.title}">Collaborate</button><button class="btn small primary" data-action="validate-idea" data-label="${i.title}">Validate</button></div></article>`).join("");
}

function renderArrival() {
  if (!exists("#arrival-checklist")) return;
  $("#arrival-checklist").innerHTML = Object.entries(state.checklist).map(([label, done]) => `<button class="check-item ${done ? "done" : ""}" data-check="${label}"><span class="check-box">${done ? "✓" : ""}</span>${label}</button>`).join("");
  const tabs = [...new Set(services.map(s => s.tab))];
  $("#arrival-tabs").innerHTML = tabs.map(t => `<button class="chip ${t === activeArrivalTab ? "active" : ""}" data-arrival-tab="${t}">${t}</button>`).join("");
  $("#arrival-services").innerHTML = services.filter(s => s.tab === activeArrivalTab).map(s => `<article class="card"><h3>${s.title}</h3><p>${s.body}</p><p>★★★★★ ${s.rating} · ${s.meta}</p><div class="card-actions"><button class="btn small secondary" data-action="view-service" data-label="${s.title}">View</button></div></article>`).join("");
}

function renderQuickActions() {
  if (!exists("#quick-actions")) return;
  $("#quick-actions").innerHTML = [
    ["Book a Mentor", "Visa, permit, career help", "mentors"],
    ["Ask Community", "Get peer answers", "community"],
    ["Find Travel Group", "Origin to destination", "travel"],
    ["Submit an Idea", "Think Lab", "thinklab"]
  ].map(([title, sub, page]) => `<button class="quick-action" data-page="${page}"><strong>${title}</strong><span>${sub}</span><em>Open</em></button>`).join("");
  $("#activity-list").innerHTML = ["Answered a community question about visa timeline", "Session with mentor James Njoroge", "Idea validated in Think Lab", "Joined an origin-to-campus travel group"].map((text, i) => `<article><b>${i + 1}</b><p>${text}<span>${i + 1} day${i ? "s" : ""} ago</span></p></article>`).join("");
}

function renderAll() {
  renderUniversityOptions();
  renderCountryOptions();
  renderModules();
  renderDashboard();
  renderQuickActions();
  renderMentors();
  renderCommunity();
  renderProfiles();
  renderProfileDashboard();
  renderTravel();
  renderThinkLab();
  renderArrival();
}

function runGlobalSearch(query) {
  const q = query.trim();
  if (!q) return;

  if (!exists("#profile-search") || !exists("#mentor-search")) {
    sessionStorage.setItem("f1flow.pendingSearch", q);
    window.location.href = "profiles.html";
    return;
  }

  $("#profile-search").value = q;
  $("#mentor-search").value = q;
  activeProfileFilter = "All";
  activeMentorFilter = "All";
  renderProfiles();
  renderMentors();
  showPage("profiles");
  toast(`Searching profiles and mentors for "${q}"`);
}

function submitIdea() {
  const title = prompt("Idea title");
  if (!title?.trim()) return;

  const category = prompt("Category", "AI / Tech") || "AI / Tech";
  const body = prompt("Short description", "Describe the problem, user, and solution.") || "New idea submitted for mentor validation.";
  state.ideas.unshift({
    cat: category.trim(),
    title: title.trim(),
    body: body.trim(),
    author: state.profile.name,
    validation: 0,
    status: "New"
  });
  saveState();
  activeIdeaFilter = "All Ideas";
  renderThinkLab();
  showPage("thinklab");
  toast("Idea submitted to Think Lab.");
}

function handleAction(action, label, targetId) {
  const normalizedLabel = label || "item";

  if (action === "mentor-request") {
    state.mentorRequests.unshift({targetId, label: normalizedLabel, time: new Date().toISOString()});
    toast(`Request saved for ${normalizedLabel}.`);
  } else if (action === "join-travel") {
    if (!state.travelMemberships.includes(normalizedLabel)) state.travelMemberships.push(normalizedLabel);
    toast(`Joined ${normalizedLabel}.`);
    renderTravel();
  } else if (action === "travel-chat") {
    toast(`Opened travel chat for ${normalizedLabel}.`);
  } else if (action === "focus-create-travel") {
    $("#travel-create-form")?.scrollIntoView({behavior: "smooth", block: "center"});
    $("#create-country")?.focus();
    toast("Create a route so students can find and join your travel plan.");
  } else if (action === "reset-travel-search") {
    travelSearch = null;
    renderTravel();
    toast("Showing all travel matches.");
  } else if (action === "view-service") {
    state.serviceViews.unshift({label: normalizedLabel, time: new Date().toISOString()});
    toast(`Saved ${normalizedLabel} to your arrival plan.`);
  } else if (action === "validate-idea") {
    const idea = state.ideas.find(item => item.title === normalizedLabel) || ideas.find(item => item.title === normalizedLabel);
    if (idea) idea.validation += 1;
    toast(`Validated "${normalizedLabel}".`);
    renderThinkLab();
  } else if (action === "collaborate") {
    toast(`Collaboration request saved for "${normalizedLabel}".`);
  } else if (action === "connect" || action === "message") {
    toast(`${action === "connect" ? "Connection" : "Message"} request saved for ${normalizedLabel}.`);
  } else if (action === "save") {
    if (!state.savedPosts.includes(normalizedLabel)) state.savedPosts.push(normalizedLabel);
    toast(`Saved "${normalizedLabel}".`);
  } else if (action === "recommend") {
    toast(`Recommended "${normalizedLabel}".`);
  } else if (action === "comment") {
    toast(`Comment composer opened for "${normalizedLabel}".`);
  } else if (action === "share") {
    toast(`Share prepared for "${normalizedLabel}".`);
  } else if (action === "journey-view") {
    showProfileDashboard(selectedProfileId);
    toast(`Opened ${normalizedLabel}'s journey dashboard.`);
  } else if (action === "alert") {
    toast(`Action noted: ${normalizedLabel}.`);
  } else {
    toast("Action saved.");
  }

  logAction(action, normalizedLabel);
  saveState();
}

function wireEvents() {
  document.addEventListener("click", event => {
    const pageButton = event.target.closest("[data-page]");
    if (pageButton) showPage(pageButton.dataset.page);

    const mentorFilter = event.target.closest("[data-mentor-filter]");
    if (mentorFilter) { activeMentorFilter = mentorFilter.dataset.mentorFilter; renderMentors(); }

    const postFilter = event.target.closest("[data-post-filter]");
    if (postFilter) { activePostFilter = postFilter.dataset.postFilter; renderCommunity(); }

    const profileFilter = event.target.closest("[data-profile-filter]");
    if (profileFilter) { activeProfileFilter = profileFilter.dataset.profileFilter; renderProfiles(); }

    const profileTab = event.target.closest("[data-profile-tab]");
    if (profileTab) { activeProfileTab = profileTab.dataset.profileTab; renderProfiles(); }

    const profileButton = event.target.closest("[data-profile]");
    if (profileButton) showProfile(profileButton.dataset.profile);

    const profileDashboardButton = event.target.closest("[data-profile-dashboard]");
    if (profileDashboardButton) showProfileDashboard(profileDashboardButton.dataset.profileDashboard);

    const recommendationButton = event.target.closest("[data-request-recommendation]");
    if (recommendationButton) {
      const studentId = recommendationButton.dataset.requestRecommendation;
      const mentorId = recommendationButton.dataset.mentorId;
      state.recommendationRequests[studentId] ||= [];
      if (!state.recommendationRequests[studentId].includes(mentorId)) {
        state.recommendationRequests[studentId].push(mentorId);
        saveState();
        renderProfileDashboard();
        toast("Recommendation request sent.");
      }
    }

    const actionButton = event.target.closest("[data-action]");
    if (actionButton) {
      handleAction(actionButton.dataset.action, actionButton.dataset.label, actionButton.dataset.mentorId);
    }

    const ideaFilter = event.target.closest("[data-idea-filter]");
    if (ideaFilter) { activeIdeaFilter = ideaFilter.dataset.ideaFilter; renderThinkLab(); }

    const arrivalTab = event.target.closest("[data-arrival-tab]");
    if (arrivalTab) { activeArrivalTab = arrivalTab.dataset.arrivalTab; renderArrival(); }

    const check = event.target.closest("[data-check]");
    if (check) {
      state.checklist[check.dataset.check] = !state.checklist[check.dataset.check];
      saveState();
      renderArrival();
    }

    const themeButton = event.target.closest("[data-theme]");
    if (themeButton) applyTheme(themeButton.dataset.theme);
  });

  $("#mentor-search")?.addEventListener("input", renderMentors);
  $("#profile-search")?.addEventListener("input", renderProfiles);
  $("#global-search")?.addEventListener("keydown", event => {
    if (event.key === "Enter") runGlobalSearch(event.currentTarget.value);
  });
  $("#open-profile")?.addEventListener("click", openProfile);
  $("#dashboard-edit-profile")?.addEventListener("click", openProfile);
  $("#submit-idea")?.addEventListener("click", submitIdea);
  $("#close-profile")?.addEventListener("click", closeProfile);
  $("#profile-modal")?.addEventListener("click", event => {
    if (event.target.id === "profile-modal") closeProfile();
  });
  $("#profile-form")?.addEventListener("submit", event => {
    event.preventDefault();
    state.profile = Object.fromEntries(new FormData(event.currentTarget).entries());
    saveState();
    closeProfile();
    renderAll();
    showPage("dashboard");
  });
  $("#post-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const body = $("#post-body").value.trim();
    if (!body) return;
    state.posts.unshift({author: state.profile.name, initials: initials(state.profile.name), topic: $("#post-topic").value, time: "Just now", q: body, body: "Community question posted from your local prototype.", answers: 0, helpful: 0});
    $("#post-body").value = "";
    saveState();
    activePostFilter = "All Topics";
    renderCommunity();
  });
  $("#travel-form")?.addEventListener("submit", event => {
    event.preventDefault();
    travelSearch = {country: $("#travel-country").value, university: $("#travel-university").value, intake: $("#travel-intake").value};
    $("#create-country").value = travelSearch.country;
    $("#create-university").value = travelSearch.university;
    $("#create-date").value = $("#travel-date").value;
    $("#create-intake").value = travelSearch.intake;
    renderTravel();
  });
  $("#travel-create-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const country = $("#create-country").value.trim();
    const university = $("#create-university").value.trim();
    const date = $("#create-date").value;
    const intake = $("#create-intake").value;
    if (!country || !university || !date) return;

    const match = {
      id: `travel-${Date.now()}`,
      country,
      university,
      route: $("#create-route").value.trim() || `${country} -> ${university}`,
      date,
      intake,
      members: 1,
      spots: Number($("#create-spots").value) || 3,
      note: $("#create-note").value.trim() || "New student-created travel match for coordinating arrival, documents, and ground transport.",
      createdBy: state.profile.name
    };

    state.travelMatches.unshift(match);
    travelSearch = {country, university, intake};
    $("#travel-country").value = country;
    $("#travel-university").value = university;
    $("#travel-date").value = date;
    $("#travel-intake").value = intake;
    $("#travel-create-form").reset();
    saveState();
    renderCountryOptions();
    renderUniversityOptions();
    renderTravel();
    toast("Travel match created. Other students can now find this route.");
  });
  $("#download-checklist")?.addEventListener("click", () => {
    const items = Object.keys(defaults.checklist).map(item => `- ${item}`).join("\n");
    const blob = new Blob([`F1Flow Visa, Permit, and Arrival Checklist\n\n${items}\n`], {type: "text/plain"});
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "f1flow-global-student-checklist.txt";
    link.click();
    URL.revokeObjectURL(link.href);
  });
  $("#login-form")?.addEventListener("submit", event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    state.profile.email = form.get("email");
    state.profile.authProvider = "email";
    saveState();
    toast("Logged in for this browser session.");
    setTimeout(() => showPage("dashboard"), 500);
  });
  $("#google-login")?.addEventListener("click", () => {
    state.profile.email ||= "student.google@example.com";
    state.profile.authProvider = "google";
    state.profile.name ||= "Google Student";
    saveState();
    toast("Google login connected for this browser session.");
    setTimeout(() => showPage("dashboard"), 500);
  });
  $("#demo-login")?.addEventListener("click", () => {
    state.profile.authProvider = "demo";
    saveState();
    toast("Demo profile loaded.");
    setTimeout(() => showPage("dashboard"), 500);
  });
}

function openProfile() {
  const form = $("#profile-form");
  Object.entries(state.profile).forEach(([key, value]) => {
    if (form.elements[key]) form.elements[key].value = value;
  });
  $("#profile-modal").classList.add("open");
  $("#profile-modal").setAttribute("aria-hidden", "false");
}

function closeProfile() {
  $("#profile-modal").classList.remove("open");
  $("#profile-modal").setAttribute("aria-hidden", "true");
}

wireEvents();
applyTheme(state.theme || "light");
renderAll();

const filePageMap = {
  "": "home",
  "index.html": "home",
  "profiles.html": "profiles",
  "dashboard.html": "dashboard",
  "community.html": "community",
  "thinklab.html": "thinklab",
  "login.html": "login"
};

const initialFile = window.location.pathname.split("/").pop();
const initialPage = window.location.hash.replace("#", "") || filePageMap[initialFile] || "home";
if (exists(`#page-${initialPage}`)) {
  showPage(initialPage);
} else {
  $all(".nav-link").forEach(btn => btn.classList.toggle("active", btn.dataset.page === initialPage));
}

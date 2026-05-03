export interface CollegeCourse {
  id: string;
  name: string;
  degreeLevel: 'UG' | 'PG' | 'PhD' | 'Diploma';
  degreeType: string;
  duration: string;
  totalFee: number;
  feePerYear: number;
  totalSeats: number;
  avgPackageLpa: number;
  highestPackageLpa: number;
  placementPercentage: number;
  mode: string;
  examsAccepted: string[];
}

export interface PlacementStat {
  year: number;
  totalEligible: number;
  totalPlaced: number;
  placementPercentage: number;
  avgPackageLpa: number;
  medianPackageLpa: number;
  highestPackageLpa: number;
  totalCompanies: number;
  internationalOffers: number;
  highestIntlPackageLpa: number;
}

export interface CollegeReview {
  id: string;
  author: string;
  isVerified: boolean;
  batch: number;
  program: string;
  overallRating: number;
  placementRating: number;
  facultyRating: number;
  infrastructureRating: number;
  campusLifeRating: number;
  valueForMoneyRating: number;
  title: string;
  pros: string;
  cons: string;
  advice: string;
  helpful: number;
  date: string;
  isCurrentStudent: boolean;
}

export interface Scholarship {
  name: string;
  type: string;
  amount: number;
  amountDesc: string;
  eligibility: string;
  renewable: boolean;
}

export interface CollegeRanking {
  body: string;
  category: string;
  rank: number;
  year: number;
  rankOutOf?: number;
}

export interface AdmissionStep {
  step: number;
  title: string;
  description: string;
}

export interface HostelDetail {
  type: 'Boys' | 'Girls' | 'Mixed';
  name: string;
  totalSeats: number;
  feeMonthly: number;
  amenities: string[];
  isOnCampus: boolean;
  distanceKm?: number;
}

export interface MockCollege {
  id: string;
  name: string;
  shortName: string;
  slug: string;
  collegeType: string;
  ownershipType: string;
  genderType: string;
  city: string;
  state: string;
  address: string;
  establishedYear: number;
  website: string;
  phone: string;
  email: string;
  logoColor: string;
  logoInitials: string;
  coverImage: string;
  description: string;
  aboutShort: string;
  vision: string;
  mission: string;
  notableAlumni: { name: string; achievement: string; year: number }[];
  naacGrade: string;
  naacCgpa: number;
  naacYear: number;
  isNba: boolean;
  isAicte: boolean;
  isUgc: boolean;
  nirfRanking: number;
  nirfCategory: string;
  nirfYear: number;
  otherRankings: CollegeRanking[];
  avgRating: number;
  totalReviews: number;
  campusSizeAcres: number;
  totalFaculty: number;
  phdFacultyPercent: number;
  studentFacultyRatio: string;
  totalStudents: number;
  totalDepartments: number;
  internationalStudents: number;
  minFeePerYear: number;
  maxFeePerYear: number;
  courses: CollegeCourse[];
  placements: PlacementStat[];
  topRecruiters: string[];
  facilities: { name: string; category: string; icon: string }[];
  hostels: HostelDetail[];
  scholarships: Scholarship[];
  entranceExams: string[];
  admissionProcess: AdmissionStep[];
  reviews: CollegeReview[];
  isFeatured: boolean;
  isPremium: boolean;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  youtube?: string;
}

export const MOCK_COLLEGES: MockCollege[] = [
  {
    id: '1',
    name: 'Indian Institute of Technology Bombay',
    shortName: 'IIT Bombay',
    slug: 'iit-bombay',
    collegeType: 'Engineering',
    ownershipType: 'Government',
    genderType: 'Co-Ed',
    city: 'Mumbai',
    state: 'Maharashtra',
    address: 'Powai, Mumbai, Maharashtra 400076',
    establishedYear: 1958,
    website: 'https://www.iitb.ac.in',
    phone: '+91 22 2572 2545',
    email: 'contact@iitb.ac.in',
    logoColor: '#003366',
    logoInitials: 'IITB',
    coverImage: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80',
    aboutShort: 'Premier engineering and technology institution in India, ranked among the world\'s best.',
    description: 'Indian Institute of Technology Bombay (IIT Bombay), established in 1958, is one of the most prestigious technical institutions in India and the world. Located in Powai, Mumbai, the institute has been a pioneer in engineering education, research, and innovation. IIT Bombay offers undergraduate, postgraduate, and doctoral programs across engineering, sciences, design, and management. The 550-acre campus houses state-of-the-art laboratories, research centers, and student facilities. The institute has produced numerous Nobel laureates, CEOs of Fortune 500 companies, and distinguished scientists who have made significant contributions globally.',
    vision: 'To be the fountainhead of new ideas and of innovations in technology and science, and to be the best technical university in the world.',
    mission: 'To create an ambience in which new ideas, research and scholarship flourish and from which the leaders and innovators of tomorrow emerge.',
    notableAlumni: [
      { name: 'Nandan Nilekani', achievement: 'Co-founder of Infosys, Former Chairman of UIDAI', year: 1978 },
      { name: 'Manohar Parrikar', achievement: 'Former Chief Minister of Goa & Defence Minister of India', year: 1978 },
      { name: 'Anil Kakodkar', achievement: 'Former Chairman of Atomic Energy Commission of India', year: 1963 },
      { name: 'Rajat Gupta', achievement: 'Former Managing Director of McKinsey & Company', year: 1971 },
    ],
    naacGrade: 'A++',
    naacCgpa: 3.84,
    naacYear: 2022,
    isNba: true,
    isAicte: true,
    isUgc: true,
    nirfRanking: 3,
    nirfCategory: 'Overall',
    nirfYear: 2024,
    otherRankings: [
      { body: 'QS World University Rankings', category: 'Overall', rank: 118, year: 2024 },
      { body: 'THE World University Rankings', category: 'Overall', rank: 351, year: 2024 },
      { body: 'NIRF', category: 'Engineering', rank: 3, year: 2024 },
      { body: 'India Today', category: 'Engineering', rank: 2, year: 2024 },
    ],
    avgRating: 4.6,
    totalReviews: 2847,
    campusSizeAcres: 550,
    totalFaculty: 622,
    phdFacultyPercent: 97.8,
    studentFacultyRatio: '9:1',
    totalStudents: 10000,
    totalDepartments: 17,
    internationalStudents: 320,
    minFeePerYear: 100000,
    maxFeePerYear: 230000,
    courses: [
      {
        id: 'c1', name: 'B.Tech in Computer Science & Engineering', degreeLevel: 'UG', degreeType: 'B.Tech',
        duration: '4 Years', totalFee: 800000, feePerYear: 200000, totalSeats: 120,
        avgPackageLpa: 28, highestPackageLpa: 2.5, placementPercentage: 100,
        mode: 'Full Time', examsAccepted: ['JEE Advanced'],
      },
      {
        id: 'c2', name: 'B.Tech in Electrical Engineering', degreeLevel: 'UG', degreeType: 'B.Tech',
        duration: '4 Years', totalFee: 800000, feePerYear: 200000, totalSeats: 80,
        avgPackageLpa: 22, highestPackageLpa: 1.8, placementPercentage: 98,
        mode: 'Full Time', examsAccepted: ['JEE Advanced'],
      },
      {
        id: 'c3', name: 'M.Tech in Data Science & AI', degreeLevel: 'PG', degreeType: 'M.Tech',
        duration: '2 Years', totalFee: 480000, feePerYear: 240000, totalSeats: 30,
        avgPackageLpa: 32, highestPackageLpa: 3.2, placementPercentage: 100,
        mode: 'Full Time', examsAccepted: ['GATE'],
      },
      {
        id: 'c4', name: 'MBA (SJMSOM)', degreeLevel: 'PG', degreeType: 'MBA',
        duration: '2 Years', totalFee: 1100000, feePerYear: 550000, totalSeats: 120,
        avgPackageLpa: 29, highestPackageLpa: 1.5, placementPercentage: 100,
        mode: 'Full Time', examsAccepted: ['CAT'],
      },
      {
        id: 'c5', name: 'Ph.D in Engineering', degreeLevel: 'PhD', degreeType: 'Ph.D',
        duration: '5 Years', totalFee: 50000, feePerYear: 10000, totalSeats: 200,
        avgPackageLpa: 18, highestPackageLpa: 0.9, placementPercentage: 95,
        mode: 'Full Time', examsAccepted: ['GATE', 'CSIR-NET'],
      },
    ],
    placements: [
      { year: 2024, totalEligible: 1820, totalPlaced: 1820, placementPercentage: 100, avgPackageLpa: 28.4, medianPackageLpa: 24, highestPackageLpa: 250, totalCompanies: 470, internationalOffers: 42, highestIntlPackageLpa: 250 },
      { year: 2023, totalEligible: 1750, totalPlaced: 1732, placementPercentage: 99, avgPackageLpa: 26.1, medianPackageLpa: 22, highestPackageLpa: 210, totalCompanies: 450, internationalOffers: 38, highestIntlPackageLpa: 210 },
      { year: 2022, totalEligible: 1680, totalPlaced: 1638, placementPercentage: 97.5, avgPackageLpa: 22.8, medianPackageLpa: 19, highestPackageLpa: 180, totalCompanies: 420, internationalOffers: 30, highestIntlPackageLpa: 180 },
    ],
    topRecruiters: ['Google', 'Microsoft', 'Apple', 'Amazon', 'Goldman Sachs', 'McKinsey', 'Morgan Stanley', 'Qualcomm', 'Texas Instruments', 'Intel', 'Samsung', 'Sony', 'Adobe', 'Flipkart', 'Uber'],
    facilities: [
      { name: 'Central Library', category: 'Academic', icon: '📚' },
      { name: 'Research Labs (200+)', category: 'Academic', icon: '🔬' },
      { name: 'Olympic-size Swimming Pool', category: 'Sports', icon: '🏊' },
      { name: 'Cricket Ground', category: 'Sports', icon: '🏏' },
      { name: 'Football & Hockey Stadium', category: 'Sports', icon: '⚽' },
      { name: 'Gymnasium', category: 'Sports', icon: '💪' },
      { name: 'Boys Hostel (18 blocks)', category: 'Hostel', icon: '🏠' },
      { name: 'Girls Hostel (3 blocks)', category: 'Hostel', icon: '🏠' },
      { name: 'Hospital & Health Centre', category: 'Medical', icon: '🏥' },
      { name: 'IIT Powai Lake', category: 'Recreation', icon: '🌊' },
      { name: 'Shopping Complex', category: 'Recreation', icon: '🛍️' },
      { name: '24/7 Wi-Fi Campus', category: 'Technology', icon: '📶' },
      { name: 'Supercomputer Facility', category: 'Technology', icon: '💻' },
      { name: 'Bank & ATM', category: 'Banking', icon: '🏦' },
      { name: 'Multiple Cafeterias', category: 'Dining', icon: '🍽️' },
    ],
    hostels: [
      { type: 'Boys', name: 'Hostel 1–18', totalSeats: 6500, feeMonthly: 3500, amenities: ['Wi-Fi', 'Laundry', 'Mess', 'Gym', 'Common Room', 'Canteen'], isOnCampus: true },
      { type: 'Girls', name: 'Hostel Gulmohar, Jasmine, Tulip', totalSeats: 1200, feeMonthly: 3500, amenities: ['Wi-Fi', 'Laundry', 'Mess', 'Gym', 'Common Room'], isOnCampus: true },
    ],
    scholarships: [
      { name: 'Merit-cum-Means Scholarship', type: 'Merit + Need', amount: 75000, amountDesc: '₹75,000/year', eligibility: 'Family income < ₹9 LPA, Top 25% in class', renewable: true },
      { name: 'Free Messing Scholarship', type: 'Need', amount: 48000, amountDesc: '₹4,000/month', eligibility: 'Family income < ₹4.5 LPA', renewable: true },
      { name: 'IITB Heritage Fund Scholarship', type: 'Merit', amount: 50000, amountDesc: '₹50,000 one-time', eligibility: 'Rank 1-100 in JEE Advanced', renewable: false },
      { name: 'SC/ST Fee Waiver', type: 'Category', amount: 200000, amountDesc: 'Full fee waiver', eligibility: 'SC/ST students', renewable: true },
    ],
    entranceExams: ['JEE Advanced', 'GATE', 'CAT', 'JAM', 'CEED'],
    admissionProcess: [
      { step: 1, title: 'JEE Advanced Registration', description: 'Register and appear for JEE Advanced after qualifying JEE Main.' },
      { step: 2, title: 'JoSAA Counselling', description: 'Participate in Joint Seat Allocation Authority (JoSAA) counselling based on rank.' },
      { step: 3, title: 'Choice Filling', description: 'Fill institute and program preferences in order of priority.' },
      { step: 4, title: 'Seat Allotment', description: 'Seats are allotted based on rank, category, and choices.' },
      { step: 5, title: 'Document Verification', description: 'Submit required documents online and report to institute for verification.' },
      { step: 6, title: 'Fee Payment & Enrollment', description: 'Pay semester fees and complete enrollment formalities.' },
    ],
    reviews: [
      {
        id: 'r1', author: 'Rohan Sharma', isVerified: true, batch: 2023, program: 'B.Tech CSE',
        overallRating: 5, placementRating: 5, facultyRating: 5, infrastructureRating: 5,
        campusLifeRating: 5, valueForMoneyRating: 4,
        title: 'Best decision of my life – IIT Bombay transformed me',
        pros: 'World-class faculty who are leaders in their fields. The research opportunities are unparalleled. The alumni network is incredibly strong – one email and you can connect with people at Google, Goldman Sachs, anywhere. The placement cell works round the clock and companies are very eager to recruit here.',
        cons: 'Academic pressure is intense and can be overwhelming. Highly competitive environment. Mumbai cost of living adds up.',
        advice: 'Focus on projects and research from Day 1. Network aggressively. Join clubs. The institute gives you all the tools – you just have to use them.',
        helpful: 342, date: '2024-03-15', isCurrentStudent: false,
      },
      {
        id: 'r2', author: 'Priya Nair', isVerified: true, batch: 2024, program: 'M.Tech Data Science',
        overallRating: 5, placementRating: 5, facultyRating: 5, infrastructureRating: 4,
        campusLifeRating: 4, valueForMoneyRating: 5,
        title: 'Dream institute – the research ecosystem is phenomenal',
        pros: 'The faculty are incredibly supportive. Research labs have the latest equipment. Being at IIT Bombay opens doors that no other college can match. M.Tech stipend of ₹12,400/month was very helpful.',
        cons: 'Hostels are a bit dated. Campus can feel isolated sometimes.',
        advice: 'Do internships during summers. Leverage the IIT brand early.',
        helpful: 198, date: '2024-01-20', isCurrentStudent: true,
      },
      {
        id: 'r3', author: 'Amit Patel', isVerified: false, batch: 2020, program: 'B.Tech Mechanical',
        overallRating: 4, placementRating: 4, facultyRating: 5, infrastructureRating: 4,
        campusLifeRating: 5, valueForMoneyRating: 4,
        title: 'Great academic environment with amazing campus life',
        pros: 'Campus life is vibrant. Mood Indigo and Techfest are world-class events. Faculty are excellent. Good placement opportunities.',
        cons: 'Mechanical core companies don\'t pay as well as CS. Curriculum could be more industry-aligned.',
        advice: 'Explore interdisciplinary minors. Core branch students should learn to code.',
        helpful: 145, date: '2023-11-10', isCurrentStudent: false,
      },
    ],
    isFeatured: true,
    isPremium: true,
    linkedin: 'https://linkedin.com/school/iit-bombay',
    youtube: 'https://youtube.com/user/IITBombay',
  },
  {
    id: '2',
    name: 'Indian Institute of Technology Delhi',
    shortName: 'IIT Delhi',
    slug: 'iit-delhi',
    collegeType: 'Engineering',
    ownershipType: 'Government',
    genderType: 'Co-Ed',
    city: 'New Delhi',
    state: 'Delhi',
    address: 'Hauz Khas, New Delhi, Delhi 110016',
    establishedYear: 1961,
    website: 'https://www.iitd.ac.in',
    phone: '+91 11 2659 7135',
    email: 'contact@iitd.ac.in',
    logoColor: '#1a237e',
    logoInitials: 'IITD',
    coverImage: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=1200&q=80',
    aboutShort: 'Centre of academic excellence in engineering and technology, located in the heart of India\'s capital.',
    description: 'Indian Institute of Technology Delhi (IIT Delhi), established in 1961, stands as one of India\'s most prestigious technical universities. Located in South Delhi\'s Hauz Khas area, the 325-acre campus is home to over 10,000 students and researchers. IIT Delhi has consistently been ranked among the top engineering institutions globally and is known for its cutting-edge research in areas like AI, clean energy, biotechnology, and quantum computing. The institute has strong industry partnerships with global tech giants and has incubated over 250 startups through its Foundation for Innovation and Technology Transfer (FITT).',
    vision: 'To contribute to India and the world through excellence in scientific and technical education, research, and service.',
    mission: 'To develop human potential to its fullest extent so that intellectually capable and imaginatively gifted leaders can emerge.',
    notableAlumni: [
      { name: 'Vinod Khosla', achievement: 'Co-founder of Sun Microsystems, Founder of Khosla Ventures', year: 1976 },
      { name: 'Raghuram Rajan', achievement: 'Former Governor of Reserve Bank of India', year: 1985 },
      { name: 'Arun Seth', achievement: 'Former MD of Alcatel Lucent India', year: 1975 },
      { name: 'Arvind Kejriwal', achievement: 'Chief Minister of Delhi', year: 1989 },
    ],
    naacGrade: 'A++',
    naacCgpa: 3.78,
    naacYear: 2022,
    isNba: true,
    isAicte: true,
    isUgc: true,
    nirfRanking: 2,
    nirfCategory: 'Overall',
    nirfYear: 2024,
    otherRankings: [
      { body: 'QS World University Rankings', category: 'Overall', rank: 150, year: 2024 },
      { body: 'THE World University Rankings', category: 'Overall', rank: 301, year: 2024 },
      { body: 'NIRF', category: 'Engineering', rank: 2, year: 2024 },
      { body: 'India Today', category: 'Engineering', rank: 1, year: 2024 },
    ],
    avgRating: 4.5,
    totalReviews: 2413,
    campusSizeAcres: 325,
    totalFaculty: 573,
    phdFacultyPercent: 98.5,
    studentFacultyRatio: '10:1',
    totalStudents: 9800,
    totalDepartments: 14,
    internationalStudents: 280,
    minFeePerYear: 110000,
    maxFeePerYear: 240000,
    courses: [
      {
        id: 'c1', name: 'B.Tech in Computer Science & Engineering', degreeLevel: 'UG', degreeType: 'B.Tech',
        duration: '4 Years', totalFee: 850000, feePerYear: 212500, totalSeats: 115,
        avgPackageLpa: 30, highestPackageLpa: 2.8, placementPercentage: 100,
        mode: 'Full Time', examsAccepted: ['JEE Advanced'],
      },
      {
        id: 'c2', name: 'B.Tech in Electrical Engineering', degreeLevel: 'UG', degreeType: 'B.Tech',
        duration: '4 Years', totalFee: 850000, feePerYear: 212500, totalSeats: 85,
        avgPackageLpa: 24, highestPackageLpa: 2.2, placementPercentage: 99,
        mode: 'Full Time', examsAccepted: ['JEE Advanced'],
      },
      {
        id: 'c3', name: 'M.Tech in Artificial Intelligence', degreeLevel: 'PG', degreeType: 'M.Tech',
        duration: '2 Years', totalFee: 520000, feePerYear: 260000, totalSeats: 25,
        avgPackageLpa: 35, highestPackageLpa: 4.0, placementPercentage: 100,
        mode: 'Full Time', examsAccepted: ['GATE'],
      },
      {
        id: 'c4', name: 'MBA (DMS)', degreeLevel: 'PG', degreeType: 'MBA',
        duration: '2 Years', totalFee: 1200000, feePerYear: 600000, totalSeats: 68,
        avgPackageLpa: 31, highestPackageLpa: 1.8, placementPercentage: 100,
        mode: 'Full Time', examsAccepted: ['CAT'],
      },
    ],
    placements: [
      { year: 2024, totalEligible: 1720, totalPlaced: 1720, placementPercentage: 100, avgPackageLpa: 31.2, medianPackageLpa: 26, highestPackageLpa: 280, totalCompanies: 490, internationalOffers: 52, highestIntlPackageLpa: 280 },
      { year: 2023, totalEligible: 1650, totalPlaced: 1640, placementPercentage: 99.4, avgPackageLpa: 28.6, medianPackageLpa: 24, highestPackageLpa: 240, totalCompanies: 460, internationalOffers: 45, highestIntlPackageLpa: 240 },
      { year: 2022, totalEligible: 1580, totalPlaced: 1545, placementPercentage: 97.8, avgPackageLpa: 25.4, medianPackageLpa: 21, highestPackageLpa: 200, totalCompanies: 430, internationalOffers: 35, highestIntlPackageLpa: 200 },
    ],
    topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Qualcomm', 'Texas Instruments', 'NVIDIA', 'Adobe', 'Goldman Sachs', 'Boston Consulting Group', 'McKinsey', 'Bain', 'Samsung', 'Intel', 'Cisco', 'Walmart'],
    facilities: [
      { name: 'Central Science Library', category: 'Academic', icon: '📚' },
      { name: 'Supercomputing Facility', category: 'Technology', icon: '💻' },
      { name: 'Swimming Pool', category: 'Sports', icon: '🏊' },
      { name: 'Basketball & Tennis Courts', category: 'Sports', icon: '🏀' },
      { name: 'Health Centre', category: 'Medical', icon: '🏥' },
      { name: '14 Hostels', category: 'Hostel', icon: '🏠' },
      { name: 'Shopping Complex', category: 'Recreation', icon: '🛍️' },
      { name: 'IIT Delhi Metro Station', category: 'Transport', icon: '🚇' },
      { name: 'Multiple Cafeterias', category: 'Dining', icon: '🍽️' },
      { name: '24x7 Wifi', category: 'Technology', icon: '📶' },
    ],
    hostels: [
      { type: 'Boys', name: 'Zanskar, Jwalamukhi, etc.', totalSeats: 5800, feeMonthly: 3200, amenities: ['Wi-Fi', 'Mess', 'Gym', 'Laundry', 'Common Room'], isOnCampus: true },
      { type: 'Girls', name: 'Kailash, Himadri, Aravali', totalSeats: 1500, feeMonthly: 3200, amenities: ['Wi-Fi', 'Mess', 'Gym', 'Laundry', 'Common Room'], isOnCampus: true },
    ],
    scholarships: [
      { name: 'Merit-cum-Means Scholarship', type: 'Merit + Need', amount: 75000, amountDesc: '₹75,000/year', eligibility: 'Family income < ₹9 LPA, Merit criteria', renewable: true },
      { name: 'SC/ST Fee Waiver', type: 'Category', amount: 200000, amountDesc: 'Full fee waiver', eligibility: 'SC/ST students', renewable: true },
      { name: 'Dean\'s List Scholarship', type: 'Merit', amount: 30000, amountDesc: '₹30,000/semester', eligibility: 'Top 10% CGPA in the branch', renewable: false },
    ],
    entranceExams: ['JEE Advanced', 'GATE', 'CAT', 'JAM'],
    admissionProcess: [
      { step: 1, title: 'JEE Advanced Qualification', description: 'Must clear JEE Main first, then qualify JEE Advanced.' },
      { step: 2, title: 'JoSAA Counselling Registration', description: 'Register on JoSAA portal within the specified dates.' },
      { step: 3, title: 'Fill Program Choices', description: 'Fill choices of institutes and programs in preferred order.' },
      { step: 4, title: 'Seat Allotment Result', description: 'Check seat allotment based on rank and preferences.' },
      { step: 5, title: 'Online Document Verification', description: 'Upload all required documents for online verification.' },
      { step: 6, title: 'Report to Institute', description: 'Physically report to IIT Delhi for final admission.' },
    ],
    reviews: [
      {
        id: 'r1', author: 'Siddharth Verma', isVerified: true, batch: 2022, program: 'B.Tech CSE',
        overallRating: 5, placementRating: 5, facultyRating: 5, infrastructureRating: 4,
        campusLifeRating: 4, valueForMoneyRating: 5,
        title: 'IIT Delhi – where dreams meet reality',
        pros: 'Placement is fantastic. Being in Delhi means amazing networking opportunities. FITT (startup incubator) is exceptional. Faculty are world-class researchers.',
        cons: 'Delhi heat in summers is brutal. Hostel food quality varies. Competition is very intense.',
        advice: 'Start working on research papers and open-source from 2nd year. Delhi location is a massive advantage.',
        helpful: 287, date: '2024-04-10', isCurrentStudent: false,
      },
      {
        id: 'r2', author: 'Anjali Gupta', isVerified: true, batch: 2023, program: 'M.Tech AI',
        overallRating: 5, placementRating: 5, facultyRating: 5, infrastructureRating: 5,
        campusLifeRating: 4, valueForMoneyRating: 5,
        title: 'M.Tech AI program is world-class',
        pros: 'Cutting-edge AI labs, excellent stipend. Industry connect is amazing. Placement packages for AI profiles are exceptional.',
        cons: 'Program is very intense, little time for anything else in first semester.',
        advice: 'Apply for the AI program if you\'re serious about ML/AI career.',
        helpful: 165, date: '2024-02-28', isCurrentStudent: true,
      },
    ],
    isFeatured: true,
    isPremium: true,
  },
  {
    id: '3',
    name: 'Indian Institute of Science',
    shortName: 'IISc Bangalore',
    slug: 'iisc-bangalore',
    collegeType: 'Science & Engineering',
    ownershipType: 'Government',
    genderType: 'Co-Ed',
    city: 'Bangalore',
    state: 'Karnataka',
    address: 'CV Raman Road, Bangalore, Karnataka 560012',
    establishedYear: 1909,
    website: 'https://www.iisc.ac.in',
    phone: '+91 80 2293 2004',
    email: 'contact@iisc.ac.in',
    logoColor: '#4a148c',
    logoInitials: 'IISc',
    coverImage: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1200&q=80',
    aboutShort: 'India\'s premier science and research institution, consistently ranked #1 in NIRF overall rankings.',
    description: 'The Indian Institute of Science (IISc), established in 1909 under the visionary patronage of Jamsetji Tata and the Maharaja of Mysore, is India\'s premier research university. Located in the heart of Bangalore, the 371-acre campus is a hub of scientific discovery and innovation. IISc is ranked #1 in India for research output and consistently appears in global top 150 for science. The institute runs unique BS Research program and several M.Tech, M.Sc and Ph.D programs. With over 40 departments and centres, 500+ faculty, and state-of-the-art research facilities, IISc attracts the brightest scientific minds in India and globally.',
    vision: 'To be among the world\'s finest institutions in research and higher education in science and engineering.',
    mission: 'To pursue and advance knowledge, to foster innovation, and to develop competent and ethical scientists and engineers.',
    notableAlumni: [
      { name: 'C.N.R. Rao', achievement: 'Bharat Ratna, World\'s foremost materials scientist', year: 1953 },
      { name: 'Roddam Narasimha', achievement: 'Former Chairman of Engineering Sciences, FRS', year: 1957 },
      { name: 'Kota Harinarayana', achievement: 'Lead designer of India\'s Tejas fighter jet', year: 1965 },
      { name: 'Vikram Sarabhai', achievement: 'Father of India\'s space programme', year: 1940 },
    ],
    naacGrade: 'A++',
    naacCgpa: 3.98,
    naacYear: 2023,
    isNba: false,
    isAicte: false,
    isUgc: true,
    nirfRanking: 1,
    nirfCategory: 'Overall',
    nirfYear: 2024,
    otherRankings: [
      { body: 'QS World University Rankings', category: 'Overall', rank: 211, year: 2024 },
      { body: 'QS World University Rankings', category: 'Research', rank: 14, year: 2024 },
      { body: 'THE World University Rankings', category: 'Overall', rank: 251, year: 2024 },
      { body: 'NIRF', category: 'University', rank: 1, year: 2024 },
    ],
    avgRating: 4.8,
    totalReviews: 1642,
    campusSizeAcres: 371,
    totalFaculty: 500,
    phdFacultyPercent: 99.9,
    studentFacultyRatio: '7:1',
    totalStudents: 4500,
    totalDepartments: 44,
    internationalStudents: 150,
    minFeePerYear: 50000,
    maxFeePerYear: 100000,
    courses: [
      {
        id: 'c1', name: 'BS Research (4-year)', degreeLevel: 'UG', degreeType: 'BS',
        duration: '4 Years', totalFee: 200000, feePerYear: 50000, totalSeats: 130,
        avgPackageLpa: 22, highestPackageLpa: 1.5, placementPercentage: 88,
        mode: 'Full Time', examsAccepted: ['JEE Advanced', 'KVPY'],
      },
      {
        id: 'c2', name: 'M.Tech in Computer Science', degreeLevel: 'PG', degreeType: 'M.Tech',
        duration: '2 Years', totalFee: 120000, feePerYear: 60000, totalSeats: 50,
        avgPackageLpa: 28, highestPackageLpa: 3.0, placementPercentage: 95,
        mode: 'Full Time', examsAccepted: ['GATE'],
      },
      {
        id: 'c3', name: 'M.Tech in Artificial Intelligence and Machine Learning', degreeLevel: 'PG', degreeType: 'M.Tech',
        duration: '2 Years', totalFee: 120000, feePerYear: 60000, totalSeats: 30,
        avgPackageLpa: 38, highestPackageLpa: 5.0, placementPercentage: 100,
        mode: 'Full Time', examsAccepted: ['GATE'],
      },
      {
        id: 'c4', name: 'Ph.D in Physics / Chemistry / Biology', degreeLevel: 'PhD', degreeType: 'Ph.D',
        duration: '5 Years', totalFee: 0, feePerYear: 0, totalSeats: 300,
        avgPackageLpa: 15, highestPackageLpa: 0.8, placementPercentage: 92,
        mode: 'Full Time', examsAccepted: ['GATE', 'CSIR-NET', 'JEST'],
      },
    ],
    placements: [
      { year: 2024, totalEligible: 850, totalPlaced: 780, placementPercentage: 91.8, avgPackageLpa: 26.4, medianPackageLpa: 22, highestPackageLpa: 185, totalCompanies: 280, internationalOffers: 65, highestIntlPackageLpa: 185 },
      { year: 2023, totalEligible: 820, totalPlaced: 748, placementPercentage: 91.2, avgPackageLpa: 24.8, medianPackageLpa: 20, highestPackageLpa: 160, totalCompanies: 265, internationalOffers: 58, highestIntlPackageLpa: 160 },
    ],
    topRecruiters: ['Google', 'Microsoft', 'Meta', 'Apple', 'Tesla', 'DRDO', 'ISRO', 'IBM Research', 'Adobe', 'Broadcom', 'Qualcomm', 'Intel', 'Tata Consultancy', 'Wipro'],
    facilities: [
      { name: 'J.R.D. Tata Memorial Library', category: 'Academic', icon: '📚' },
      { name: '50+ Research Centres', category: 'Academic', icon: '🔬' },
      { name: 'National Supercomputing Mission', category: 'Technology', icon: '💻' },
      { name: 'Sports Complex', category: 'Sports', icon: '🏟️' },
      { name: 'IISc Health Centre', category: 'Medical', icon: '🏥' },
      { name: '9 Student Residences', category: 'Hostel', icon: '🏠' },
      { name: 'Canteen & Multiple Cafes', category: 'Dining', icon: '🍽️' },
      { name: 'Guest House', category: 'Recreation', icon: '🏨' },
      { name: 'Bank & Post Office', category: 'Banking', icon: '🏦' },
    ],
    hostels: [
      { type: 'Mixed', name: 'Student Residences A-I', totalSeats: 3800, feeMonthly: 2500, amenities: ['Wi-Fi', 'Mess', 'Gym', 'Common Room', 'Laundry'], isOnCampus: true },
    ],
    scholarships: [
      { name: 'KVPY Fellowship', type: 'Merit', amount: 96000, amountDesc: '₹8,000/month', eligibility: 'KVPY scholarship holders', renewable: true },
      { name: 'CSIR-SRF/JRF', type: 'Merit', amount: 360000, amountDesc: '₹25,000-30,000/month', eligibility: 'Ph.D scholars with CSIR/UGC fellowship', renewable: true },
      { name: 'PMRF (Prime Minister Research Fellowship)', type: 'Merit', amount: 864000, amountDesc: '₹70,000-80,000/month', eligibility: 'Exceptional Ph.D candidates from IITs/IISc', renewable: true },
    ],
    entranceExams: ['JEE Advanced', 'KVPY', 'GATE', 'CSIR-NET', 'JEST', 'TIFR-GS'],
    admissionProcess: [
      { step: 1, title: 'Qualify Entrance Exam', description: 'Clear JEE Advanced (BS Research) or GATE/CSIR-NET (PG/PhD).' },
      { step: 2, title: 'Apply Online', description: 'Fill the online application form at iisc.ac.in with all required details.' },
      { step: 3, title: 'Merit List & Interview', description: 'Shortlisted candidates are called for written test/interview (for Ph.D).' },
      { step: 4, title: 'Admission Offer', description: 'Admission offers sent to selected candidates.' },
      { step: 5, title: 'Fee Payment', description: 'Confirm admission by paying the first semester fees online.' },
    ],
    reviews: [
      {
        id: 'r1', author: 'Dr. Suresh Menon', isVerified: true, batch: 2019, program: 'Ph.D Physics',
        overallRating: 5, placementRating: 5, facultyRating: 5, infrastructureRating: 5,
        campusLifeRating: 5, valueForMoneyRating: 5,
        title: 'The best research environment in Asia – period.',
        pros: 'Research facilities are world class. Access to the latest equipment. Work with Nobel-prize caliber faculty. PMRF Fellowship covers all expenses. Bangalore\'s startup ecosystem is incredible for research commercialization.',
        cons: 'Placements for non-CS researchers are limited. Very demanding PhD program.',
        advice: 'Come here only if you\'re serious about research. The opportunities are unmatched.',
        helpful: 423, date: '2024-05-01', isCurrentStudent: false,
      },
    ],
    isFeatured: true,
    isPremium: true,
  },
  {
    id: '4',
    name: 'BITS Pilani',
    shortName: 'BITS Pilani',
    slug: 'bits-pilani',
    collegeType: 'Engineering',
    ownershipType: 'Deemed Private',
    genderType: 'Co-Ed',
    city: 'Pilani',
    state: 'Rajasthan',
    address: 'Vidya Vihar, Pilani, Rajasthan 333031',
    establishedYear: 1964,
    website: 'https://www.bits-pilani.ac.in',
    phone: '+91 1596 242222',
    email: 'admissions@bits-pilani.ac.in',
    logoColor: '#b71c1c',
    logoInitials: 'BITS',
    coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80',
    aboutShort: 'Top-ranked private deemed university known for its unique flexible curriculum and Practice School program.',
    description: 'Birla Institute of Technology and Science (BITS), Pilani is a premier private engineering institution of national importance established in 1964. BITS Pilani is famous for its unique dual degree programs, flexible curriculum, and the revolutionary Practice School (PS) program that places students in top companies for internships. With campuses in Pilani, Goa, Hyderabad, and Dubai, BITS attracts students from across the globe. The institute is known for producing entrepreneurial graduates – over 1,500 BITS alumni are founders of successful companies. BITS accepts its own BITSAT entrance exam and does not rely on JEE.',
    vision: 'To be an institution of excellence for higher education, research, and practice in science and technology.',
    mission: 'To develop competent engineers and scientists who are ethically responsible and contribute to society.',
    notableAlumni: [
      { name: 'Sabeer Bhatia', achievement: 'Co-founder of Hotmail (sold to Microsoft for $400M)', year: 1988 },
      { name: 'G.V. Prasad', achievement: 'Co-chairman of Dr. Reddy\'s Laboratories', year: 1978 },
      { name: 'Kumar Mangalam Birla', achievement: 'Chairman of Aditya Birla Group', year: 1988 },
      { name: 'Sridhar Vembu', achievement: 'Founder & CEO of Zoho Corporation', year: 1989 },
    ],
    naacGrade: 'A',
    naacCgpa: 3.42,
    naacYear: 2017,
    isNba: true,
    isAicte: true,
    isUgc: true,
    nirfRanking: 22,
    nirfCategory: 'Overall',
    nirfYear: 2024,
    otherRankings: [
      { body: 'QS World University Rankings', category: 'Overall', rank: 451, year: 2024 },
      { body: 'NIRF', category: 'Engineering', rank: 17, year: 2024 },
      { body: 'India Today', category: 'Engineering', rank: 5, year: 2024 },
      { body: 'Outlook', category: 'Engineering', rank: 4, year: 2024 },
    ],
    avgRating: 4.4,
    totalReviews: 3241,
    campusSizeAcres: 328,
    totalFaculty: 420,
    phdFacultyPercent: 87,
    studentFacultyRatio: '13:1',
    totalStudents: 6200,
    totalDepartments: 15,
    internationalStudents: 80,
    minFeePerYear: 420000,
    maxFeePerYear: 560000,
    courses: [
      {
        id: 'c1', name: 'B.E. in Computer Science', degreeLevel: 'UG', degreeType: 'B.E.',
        duration: '4 Years', totalFee: 2000000, feePerYear: 500000, totalSeats: 180,
        avgPackageLpa: 18, highestPackageLpa: 1.5, placementPercentage: 97,
        mode: 'Full Time', examsAccepted: ['BITSAT'],
      },
      {
        id: 'c2', name: 'M.Sc. (Hons.) Economics + B.E. CSE (Dual Degree)', degreeLevel: 'UG', degreeType: 'Dual Degree',
        duration: '5 Years', totalFee: 2500000, feePerYear: 500000, totalSeats: 60,
        avgPackageLpa: 22, highestPackageLpa: 2.0, placementPercentage: 98,
        mode: 'Full Time', examsAccepted: ['BITSAT'],
      },
      {
        id: 'c3', name: 'M.E. in Software Systems', degreeLevel: 'PG', degreeType: 'M.E.',
        duration: '2 Years', totalFee: 900000, feePerYear: 450000, totalSeats: 30,
        avgPackageLpa: 20, highestPackageLpa: 1.2, placementPercentage: 95,
        mode: 'Full Time', examsAccepted: ['BITSAT', 'GATE'],
      },
    ],
    placements: [
      { year: 2024, totalEligible: 1320, totalPlaced: 1283, placementPercentage: 97.2, avgPackageLpa: 17.8, medianPackageLpa: 14.5, highestPackageLpa: 150, totalCompanies: 310, internationalOffers: 22, highestIntlPackageLpa: 150 },
      { year: 2023, totalEligible: 1280, totalPlaced: 1228, placementPercentage: 95.9, avgPackageLpa: 16.2, medianPackageLpa: 13, highestPackageLpa: 120, totalCompanies: 290, internationalOffers: 18, highestIntlPackageLpa: 120 },
    ],
    topRecruiters: ['Google', 'Microsoft', 'Amazon', 'Goldman Sachs', 'Optiver', 'Tower Research', 'Qualcomm', 'Texas Instruments', 'Oracle', 'VMware', 'Flipkart', 'Zomato', 'Paytm', 'Adobe', 'SAP'],
    facilities: [
      { name: 'Central Library', category: 'Academic', icon: '📚' },
      { name: 'Innovation Centre', category: 'Academic', icon: '💡' },
      { name: 'Olympic Swimming Pool', category: 'Sports', icon: '🏊' },
      { name: 'Auditorium', category: 'Recreation', icon: '🎭' },
      { name: 'Hospital', category: 'Medical', icon: '🏥' },
      { name: '14 Hostels', category: 'Hostel', icon: '🏠' },
      { name: 'Shopping Complex', category: 'Recreation', icon: '🛍️' },
      { name: 'Bank', category: 'Banking', icon: '🏦' },
      { name: 'High Speed Wi-Fi', category: 'Technology', icon: '📶' },
    ],
    hostels: [
      { type: 'Boys', name: '10 Boys Hostels', totalSeats: 4000, feeMonthly: 8000, amenities: ['Wi-Fi', 'Mess', 'Gym', 'AC Rooms (Optional)', 'Common Room'], isOnCampus: true },
      { type: 'Girls', name: '4 Girls Hostels', totalSeats: 1800, feeMonthly: 8000, amenities: ['Wi-Fi', 'Mess', 'Gym', 'Common Room'], isOnCampus: true },
    ],
    scholarships: [
      { name: 'Merit Scholarship (70% and above)', type: 'Merit', amount: 30000, amountDesc: '₹30,000/semester', eligibility: 'CGPA ≥ 7.0 in first semester', renewable: true },
      { name: 'Dr. Pillai Scholarship', type: 'Merit', amount: 50000, amountDesc: '₹50,000/year', eligibility: 'Top 1% in BITSAT', renewable: false },
      { name: 'BITS Pilani Need-Based Aid', type: 'Need', amount: 100000, amountDesc: 'Varies', eligibility: 'Family income < ₹5 LPA', renewable: true },
    ],
    entranceExams: ['BITSAT'],
    admissionProcess: [
      { step: 1, title: 'BITSAT Registration', description: 'Register for BITSAT on the official BITS Pilani website.' },
      { step: 2, title: 'Appear for BITSAT', description: 'Take the computer-based BITSAT test at authorized centers.' },
      { step: 3, title: 'Apply for Admission', description: 'Fill the admission application form with BITSAT score and preferences.' },
      { step: 4, title: 'Iteration Process', description: 'Participate in the merit-based iterative admission process.' },
      { step: 5, title: 'Fee Payment', description: 'Pay the admission and semester fees online.' },
      { step: 6, title: 'Reporting', description: 'Report to the campus with original documents.' },
    ],
    reviews: [
      {
        id: 'r1', author: 'Kartik Mehta', isVerified: true, batch: 2023, program: 'B.E. CSE',
        overallRating: 4, placementRating: 5, facultyRating: 4, infrastructureRating: 4,
        campusLifeRating: 5, valueForMoneyRating: 3,
        title: 'Best private engineering college in India – worth every rupee',
        pros: 'Practice School is unmatched – you get paid internships at top companies. Dual degree option is a game-changer. Alumni network is incredibly supportive. Campus life in Pilani is unique – everyone is focused on academics.',
        cons: 'Pilani is remote – social life outside campus is limited. Fees are very high (₹2 crore total). Faculty research is not as strong as IITs.',
        advice: 'Focus on PS2 company selection. Get into finance or quant firms for the best packages.',
        helpful: 412, date: '2024-03-22', isCurrentStudent: false,
      },
    ],
    isFeatured: true,
    isPremium: true,
  },
  {
    id: '5',
    name: 'National Institute of Technology Tiruchirappalli',
    shortName: 'NIT Trichy',
    slug: 'nit-trichy',
    collegeType: 'Engineering',
    ownershipType: 'Government',
    genderType: 'Co-Ed',
    city: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    address: 'Tiruchirappalli, Tamil Nadu 620015',
    establishedYear: 1964,
    website: 'https://www.nitt.edu',
    phone: '+91 431 250 3000',
    email: 'registrar@nitt.edu',
    logoColor: '#0d47a1',
    logoInitials: 'NITT',
    coverImage: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=80',
    aboutShort: 'India\'s #1 NIT, consistently ranked among the top 10 engineering colleges in India.',
    description: 'National Institute of Technology Tiruchirappalli (NIT Trichy), established in 1964 as Regional Engineering College Tiruchirappalli, is consistently ranked as the best NIT in India. Located in Tiruchirappalli, Tamil Nadu, the institute has produced thousands of engineers and scientists who have achieved global excellence. Known for its vibrant campus culture, with annual technical festival Pragyan and cultural festival Festember attracting 80,000+ participants. The institute has strong industry partnerships and an active alumni association spread across 60+ countries.',
    vision: 'To be a globally renowned centre of excellence in engineering, technology, and research.',
    mission: 'To provide high quality technical education with strong research focus to develop globally competitive engineers.',
    notableAlumni: [
      { name: 'Sundar Pichai', achievement: 'CEO of Alphabet & Google (MIT, Wharton)', year: 1993 },
      { name: 'K.V. Kamath', achievement: 'Former MD & CEO of ICICI Bank', year: 1969 },
      { name: 'N. Chandrasekaran', achievement: 'Chairman of Tata Sons', year: 1987 },
    ],
    naacGrade: 'A++',
    naacCgpa: 3.72,
    naacYear: 2023,
    isNba: true,
    isAicte: true,
    isUgc: true,
    nirfRanking: 9,
    nirfCategory: 'Engineering',
    nirfYear: 2024,
    otherRankings: [
      { body: 'NIRF', category: 'Overall', rank: 18, year: 2024 },
      { body: 'QS World University Rankings', category: 'Overall', rank: 801, year: 2024 },
      { body: 'India Today', category: 'Engineering', rank: 9, year: 2024 },
    ],
    avgRating: 4.3,
    totalReviews: 1987,
    campusSizeAcres: 800,
    totalFaculty: 379,
    phdFacultyPercent: 88,
    studentFacultyRatio: '16:1',
    totalStudents: 8100,
    totalDepartments: 17,
    internationalStudents: 45,
    minFeePerYear: 60000,
    maxFeePerYear: 80000,
    courses: [
      {
        id: 'c1', name: 'B.Tech in Computer Science & Engineering', degreeLevel: 'UG', degreeType: 'B.Tech',
        duration: '4 Years', totalFee: 280000, feePerYear: 70000, totalSeats: 164,
        avgPackageLpa: 14, highestPackageLpa: 1.0, placementPercentage: 95,
        mode: 'Full Time', examsAccepted: ['JEE Main'],
      },
      {
        id: 'c2', name: 'B.Tech in Mechanical Engineering', degreeLevel: 'UG', degreeType: 'B.Tech',
        duration: '4 Years', totalFee: 280000, feePerYear: 70000, totalSeats: 137,
        avgPackageLpa: 8, highestPackageLpa: 0.6, placementPercentage: 88,
        mode: 'Full Time', examsAccepted: ['JEE Main'],
      },
      {
        id: 'c3', name: 'M.Tech in Software Engineering', degreeLevel: 'PG', degreeType: 'M.Tech',
        duration: '2 Years', totalFee: 120000, feePerYear: 60000, totalSeats: 20,
        avgPackageLpa: 15, highestPackageLpa: 0.8, placementPercentage: 92,
        mode: 'Full Time', examsAccepted: ['GATE'],
      },
    ],
    placements: [
      { year: 2024, totalEligible: 1520, totalPlaced: 1430, placementPercentage: 94.1, avgPackageLpa: 13.4, medianPackageLpa: 10.5, highestPackageLpa: 100, totalCompanies: 260, internationalOffers: 12, highestIntlPackageLpa: 100 },
      { year: 2023, totalEligible: 1480, totalPlaced: 1375, placementPercentage: 92.9, avgPackageLpa: 12.1, medianPackageLpa: 9.5, highestPackageLpa: 85, totalCompanies: 240, internationalOffers: 10, highestIntlPackageLpa: 85 },
    ],
    topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'Amazon', 'Microsoft', 'Google', 'Samsung', 'Zoho', 'Freshworks', 'Walmart', 'Goldman Sachs', 'DE Shaw', 'JP Morgan', 'Hyundai'],
    facilities: [
      { name: 'Nandha Kumaran Library', category: 'Academic', icon: '📚' },
      { name: 'Research Centres', category: 'Academic', icon: '🔬' },
      { name: 'Sports Complex', category: 'Sports', icon: '🏟️' },
      { name: 'Swimming Pool', category: 'Sports', icon: '🏊' },
      { name: 'Health Centre', category: 'Medical', icon: '🏥' },
      { name: '12 Hostels', category: 'Hostel', icon: '🏠' },
      { name: 'Multiple Canteens', category: 'Dining', icon: '🍽️' },
      { name: 'Supermarket', category: 'Recreation', icon: '🛒' },
    ],
    hostels: [
      { type: 'Boys', name: '8 Boys Hostels', totalSeats: 4500, feeMonthly: 2500, amenities: ['Wi-Fi', 'Mess', 'Gym', 'Common Room'], isOnCampus: true },
      { type: 'Girls', name: '4 Girls Hostels', totalSeats: 2000, feeMonthly: 2500, amenities: ['Wi-Fi', 'Mess', 'Gym', 'Common Room'], isOnCampus: true },
    ],
    scholarships: [
      { name: 'Merit Scholarship', type: 'Merit', amount: 25000, amountDesc: '₹25,000/year', eligibility: 'Top 10% in the batch', renewable: true },
      { name: 'Government SC/ST Scholarship', type: 'Category', amount: 60000, amountDesc: 'Full fee waiver', eligibility: 'SC/ST students', renewable: true },
      { name: 'State Government Scholarship', type: 'Need', amount: 20000, amountDesc: '₹20,000/year', eligibility: 'Tamil Nadu students with family income < ₹2.5 LPA', renewable: true },
    ],
    entranceExams: ['JEE Main', 'GATE', 'NIMCET'],
    admissionProcess: [
      { step: 1, title: 'JEE Main', description: 'Qualify JEE Main and register for JoSAA counselling.' },
      { step: 2, title: 'JoSAA/CSAB Counselling', description: 'Fill NIT preferences in JoSAA or CSAB (Special Round).' },
      { step: 3, title: 'Seat Allotment', description: 'Accept allotted seat and pay seat acceptance fee.' },
      { step: 4, title: 'Reporting', description: 'Report to NIT Trichy with original documents.' },
    ],
    reviews: [
      {
        id: 'r1', author: 'Kavitha Rajan', isVerified: true, batch: 2022, program: 'B.Tech CSE',
        overallRating: 4, placementRating: 4, facultyRating: 4, infrastructureRating: 4,
        campusLifeRating: 5, valueForMoneyRating: 5,
        title: 'NIT Trichy – incredible value for money, amazing campus life',
        pros: 'Best value proposition in Indian engineering education. Campus life is unbeatable – Pragyan and Festember are massive. Tamil Nadu state students have excellent placement opportunities locally and globally.',
        cons: 'Core branch placements lag behind CS/IT. Tiruchirappalli city life is limited. AC dorms are extra cost.',
        advice: 'Participate actively in technical clubs. The alumni network in the US is very strong.',
        helpful: 234, date: '2024-02-14', isCurrentStudent: false,
      },
    ],
    isFeatured: true,
    isPremium: false,
  },
  {
    id: '6',
    name: 'VIT Vellore',
    shortName: 'VIT Vellore',
    slug: 'vit-vellore',
    collegeType: 'Engineering',
    ownershipType: 'Deemed Private',
    genderType: 'Co-Ed',
    city: 'Vellore',
    state: 'Tamil Nadu',
    address: 'Vellore, Tamil Nadu 632014',
    establishedYear: 1984,
    website: 'https://vit.ac.in',
    phone: '+91 416 2202020',
    email: 'admission@vit.ac.in',
    logoColor: '#880e4f',
    logoInitials: 'VIT',
    coverImage: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=1200&q=80',
    aboutShort: 'One of India\'s most popular private engineering universities with 30,000+ students and 180+ programs.',
    description: 'Vellore Institute of Technology (VIT), established in 1984 by Dr. G. Viswanathan, has grown into one of India\'s largest and most prominent private universities. With over 35,000 students from 65+ countries, VIT Vellore offers a truly global academic experience. The university is known for its industry-oriented curriculum, strong placement record, and world-class infrastructure. VIT conducts its own entrance exam (VITEEE) and is known for accepting students from diverse academic backgrounds. The university has strong research collaborations with institutions in the US, UK, Germany, and Australia.',
    vision: 'To provide quality technical education of international standards and to enable our graduates to become outstanding engineers and business leaders.',
    mission: 'To provide a quality learning environment and produce technically competent professionals with good ethical values.',
    notableAlumni: [
      { name: 'Prithviraj Sukumaran', achievement: 'Bollywood/Malayalam actor and director', year: 2002 },
      { name: 'Sriram Rajgopal', achievement: 'Senior Executive, Google', year: 2008 },
    ],
    naacGrade: 'A++',
    naacCgpa: 3.66,
    naacYear: 2023,
    isNba: true,
    isAicte: true,
    isUgc: true,
    nirfRanking: 11,
    nirfCategory: 'University',
    nirfYear: 2024,
    otherRankings: [
      { body: 'QS World University Rankings', category: 'Overall', rank: 581, year: 2024 },
      { body: 'NIRF', category: 'Engineering', rank: 11, year: 2024 },
      { body: 'Times Higher Education', category: 'Asia', rank: 251, year: 2024 },
    ],
    avgRating: 4.0,
    totalReviews: 5421,
    campusSizeAcres: 372,
    totalFaculty: 2700,
    phdFacultyPercent: 72,
    studentFacultyRatio: '14:1',
    totalStudents: 35000,
    totalDepartments: 22,
    internationalStudents: 2200,
    minFeePerYear: 190000,
    maxFeePerYear: 380000,
    courses: [
      {
        id: 'c1', name: 'B.Tech in Computer Science (Specializations in AI, DS, Cybersecurity)', degreeLevel: 'UG', degreeType: 'B.Tech',
        duration: '4 Years', totalFee: 750000, feePerYear: 187500, totalSeats: 600,
        avgPackageLpa: 8, highestPackageLpa: 0.9, placementPercentage: 86,
        mode: 'Full Time', examsAccepted: ['VITEEE', 'JEE Main'],
      },
      {
        id: 'c2', name: 'B.Tech in Mechanical Engineering', degreeLevel: 'UG', degreeType: 'B.Tech',
        duration: '4 Years', totalFee: 700000, feePerYear: 175000, totalSeats: 300,
        avgPackageLpa: 5.5, highestPackageLpa: 0.4, placementPercentage: 78,
        mode: 'Full Time', examsAccepted: ['VITEEE', 'JEE Main'],
      },
      {
        id: 'c3', name: 'M.Tech in AI & Machine Learning', degreeLevel: 'PG', degreeType: 'M.Tech',
        duration: '2 Years', totalFee: 360000, feePerYear: 180000, totalSeats: 60,
        avgPackageLpa: 12, highestPackageLpa: 0.6, placementPercentage: 90,
        mode: 'Full Time', examsAccepted: ['GATE', 'VITMEE'],
      },
      {
        id: 'c4', name: 'MBA', degreeLevel: 'PG', degreeType: 'MBA',
        duration: '2 Years', totalFee: 600000, feePerYear: 300000, totalSeats: 120,
        avgPackageLpa: 8, highestPackageLpa: 0.5, placementPercentage: 88,
        mode: 'Full Time', examsAccepted: ['CAT', 'XAT', 'GMAT', 'VIT MBA Exam'],
      },
    ],
    placements: [
      { year: 2024, totalEligible: 6800, totalPlaced: 5848, placementPercentage: 86, avgPackageLpa: 7.9, medianPackageLpa: 6.5, highestPackageLpa: 91, totalCompanies: 580, internationalOffers: 38, highestIntlPackageLpa: 91 },
      { year: 2023, totalEligible: 6500, totalPlaced: 5590, placementPercentage: 86, avgPackageLpa: 7.2, medianPackageLpa: 6, highestPackageLpa: 78, totalCompanies: 540, internationalOffers: 30, highestIntlPackageLpa: 78 },
    ],
    topRecruiters: ['TCS', 'Infosys', 'Wipro', 'Cognizant', 'HCL', 'Amazon', 'Capgemini', 'Accenture', 'L&T Infotech', 'Zoho', 'Bosch', 'Hyundai', 'Saint-Gobain', 'Caterpillar'],
    facilities: [
      { name: 'Silver Jubilee Library', category: 'Academic', icon: '📚' },
      { name: 'Tech Tower', category: 'Academic', icon: '🏢' },
      { name: 'Outdoor Stadium', category: 'Sports', icon: '🏟️' },
      { name: 'Swimming Pool', category: 'Sports', icon: '🏊' },
      { name: 'Hospital (500-bed)', category: 'Medical', icon: '🏥' },
      { name: '23 Hostels', category: 'Hostel', icon: '🏠' },
      { name: 'Food Courts & Cafeterias', category: 'Dining', icon: '🍽️' },
      { name: 'Shopping Mall on campus', category: 'Recreation', icon: '🛍️' },
      { name: 'Bank & ATM', category: 'Banking', icon: '🏦' },
      { name: 'High-speed Wi-Fi', category: 'Technology', icon: '📶' },
      { name: 'Multiplex Cinema', category: 'Recreation', icon: '🎬' },
    ],
    hostels: [
      { type: 'Boys', name: '15 Boys Hostels', totalSeats: 12000, feeMonthly: 6000, amenities: ['AC Available', 'Wi-Fi', 'Mess', 'Gym', 'Common Room', 'Laundry'], isOnCampus: true },
      { type: 'Girls', name: '8 Girls Hostels', totalSeats: 6500, feeMonthly: 6000, amenities: ['AC Available', 'Wi-Fi', 'Mess', 'Gym', 'Common Room'], isOnCampus: true },
    ],
    scholarships: [
      { name: 'Chancellor\'s Scholarship', type: 'Merit', amount: 50000, amountDesc: '₹50,000/year', eligibility: 'VITEEE rank 1-500', renewable: true },
      { name: 'Merit Scholarship', type: 'Merit', amount: 25000, amountDesc: '₹25,000/year', eligibility: 'VITEEE rank 501-2500', renewable: false },
      { name: 'Sports Scholarship', type: 'Sports', amount: 30000, amountDesc: '₹30,000/year', eligibility: 'State/National level sports achievement', renewable: true },
      { name: 'Need-based Aid', type: 'Need', amount: 50000, amountDesc: 'Up to ₹50,000/year', eligibility: 'Family income < ₹3 LPA', renewable: true },
    ],
    entranceExams: ['VITEEE', 'JEE Main', 'SAT (International)'],
    admissionProcess: [
      { step: 1, title: 'VITEEE Registration', description: 'Register for VITEEE online at vit.ac.in from November onwards.' },
      { step: 2, title: 'VITEEE Exam', description: 'Appear for VITEEE computer-based test at authorized centers.' },
      { step: 3, title: 'Counselling', description: 'Participate in online or offline counselling based on VITEEE rank.' },
      { step: 4, title: 'Program Selection', description: 'Choose program based on rank and seat availability.' },
      { step: 5, title: 'Fee Payment & Reporting', description: 'Pay fees and report to campus with documents.' },
    ],
    reviews: [
      {
        id: 'r1', author: 'Arun Kumar', isVerified: true, batch: 2023, program: 'B.Tech CSE',
        overallRating: 4, placementRating: 4, facultyRating: 3, infrastructureRating: 5,
        campusLifeRating: 5, valueForMoneyRating: 4,
        title: 'Great infrastructure and campus life – best non-IIT/NIT experience',
        pros: 'Campus is absolutely beautiful and huge. Infrastructure rivals any college in India. International exposure is excellent. 580+ companies visit every year. Great diversity – students from 65 countries.',
        cons: 'Faculty quality is inconsistent. Too many students per batch makes it hard to stand out. Fees are high for India.',
        advice: 'Choose CSE/IT for best placement. Leverage the international student community for networking.',
        helpful: 389, date: '2024-04-05', isCurrentStudent: false,
      },
    ],
    isFeatured: true,
    isPremium: true,
  },
  {
    id: '7',
    name: 'All India Institute of Medical Sciences Delhi',
    shortName: 'AIIMS Delhi',
    slug: 'aiims-delhi',
    collegeType: 'Medical',
    ownershipType: 'Government',
    genderType: 'Co-Ed',
    city: 'New Delhi',
    state: 'Delhi',
    address: 'Ansari Nagar, New Delhi, Delhi 110029',
    establishedYear: 1956,
    website: 'https://www.aiims.edu',
    phone: '+91 11 2658 8500',
    email: 'info@aiims.edu',
    logoColor: '#1b5e20',
    logoInitials: 'AIIMS',
    coverImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80',
    aboutShort: 'India\'s premier medical institution, producing the finest doctors and medical researchers in the country.',
    description: 'All India Institute of Medical Sciences (AIIMS), New Delhi, established in 1956, is India\'s foremost medical institution and is consistently ranked #1 for Medical education in India. AIIMS Delhi is recognized worldwide for its excellence in medical education, research, and healthcare. It operates one of the largest tertiary care hospitals in the world, providing healthcare to over 2 million patients annually. The institute runs M.B.B.S, M.D., M.S., DM, M.Ch., B.Sc., M.Sc., and Ph.D programs. AIIMS is renowned for its research output in clinical sciences, basic sciences, and public health.',
    vision: 'To be a world leader in health sciences education, research, and patient care.',
    mission: 'To train high quality physicians and medical scientists committed to advancing healthcare and biomedical research in India.',
    notableAlumni: [
      { name: 'Dr. T.S. Kanaka', achievement: 'First female neurosurgeon in India', year: 1967 },
      { name: 'Dr. Naresh Trehan', achievement: 'Founder of Medanta – The Medicity', year: 1969 },
      { name: 'Dr. Devi Shetty', achievement: 'Founder of Narayana Health, Pioneer of affordable cardiac surgery', year: 1983 },
      { name: 'Dr. K.K. Talwar', achievement: 'Director of AIIMS Delhi, Former Director-General of ICMR', year: 1974 },
    ],
    naacGrade: 'A++',
    naacCgpa: 3.91,
    naacYear: 2023,
    isNba: false,
    isAicte: false,
    isUgc: true,
    nirfRanking: 1,
    nirfCategory: 'Medical',
    nirfYear: 2024,
    otherRankings: [
      { body: 'NIRF', category: 'Overall', rank: 4, year: 2024 },
      { body: 'QS World University Rankings', category: 'Medicine', rank: 151, year: 2024 },
      { body: 'Times Higher Education', category: 'Medicine', rank: 201, year: 2024 },
    ],
    avgRating: 4.7,
    totalReviews: 1243,
    campusSizeAcres: 82,
    totalFaculty: 1200,
    phdFacultyPercent: 95,
    studentFacultyRatio: '6:1',
    totalStudents: 3500,
    totalDepartments: 42,
    internationalStudents: 65,
    minFeePerYear: 7000,
    maxFeePerYear: 50000,
    courses: [
      {
        id: 'c1', name: 'MBBS', degreeLevel: 'UG', degreeType: 'MBBS',
        duration: '5.5 Years', totalFee: 35000, feePerYear: 7000, totalSeats: 107,
        avgPackageLpa: 15, highestPackageLpa: 0.8, placementPercentage: 100,
        mode: 'Full Time', examsAccepted: ['NEET-UG'],
      },
      {
        id: 'c2', name: 'M.D. in General Medicine', degreeLevel: 'PG', degreeType: 'M.D.',
        duration: '3 Years', totalFee: 150000, feePerYear: 50000, totalSeats: 15,
        avgPackageLpa: 20, highestPackageLpa: 1.0, placementPercentage: 100,
        mode: 'Full Time', examsAccepted: ['AIIMS-PG', 'NEET-PG'],
      },
      {
        id: 'c3', name: 'M.S. in General Surgery', degreeLevel: 'PG', degreeType: 'M.S.',
        duration: '3 Years', totalFee: 150000, feePerYear: 50000, totalSeats: 12,
        avgPackageLpa: 22, highestPackageLpa: 1.2, placementPercentage: 100,
        mode: 'Full Time', examsAccepted: ['AIIMS-PG', 'NEET-PG'],
      },
    ],
    placements: [
      { year: 2024, totalEligible: 400, totalPlaced: 400, placementPercentage: 100, avgPackageLpa: 18.5, medianPackageLpa: 15, highestPackageLpa: 80, totalCompanies: 120, internationalOffers: 28, highestIntlPackageLpa: 80 },
    ],
    topRecruiters: ['AIIMS Network Hospitals', 'Medanta', 'Fortis', 'Max Healthcare', 'Apollo Hospitals', 'Narayana Health', 'WHO', 'ICMR', 'DRDO Medical', 'Tata Memorial Centre'],
    facilities: [
      { name: 'Central Library (6 floors)', category: 'Academic', icon: '📚' },
      { name: 'Simulation Lab', category: 'Academic', icon: '🔬' },
      { name: 'Tertiary Care Hospital (2,000 beds)', category: 'Medical', icon: '🏥' },
      { name: 'Trauma Centre', category: 'Medical', icon: '🚑' },
      { name: 'Sports Complex', category: 'Sports', icon: '🏟️' },
      { name: 'Hostels', category: 'Hostel', icon: '🏠' },
      { name: 'Cafeterias', category: 'Dining', icon: '🍽️' },
      { name: 'Bank & ATM', category: 'Banking', icon: '🏦' },
    ],
    hostels: [
      { type: 'Boys', name: 'Boys Hostel Complex', totalSeats: 1200, feeMonthly: 2000, amenities: ['Mess', 'Wi-Fi', 'Gym', 'Common Room', 'Medical Facility'], isOnCampus: true },
      { type: 'Girls', name: 'Girls Hostel', totalSeats: 600, feeMonthly: 2000, amenities: ['Mess', 'Wi-Fi', 'Gym', 'Common Room'], isOnCampus: true },
    ],
    scholarships: [
      { name: 'Ministry of Health Scholarship', type: 'Need', amount: 30000, amountDesc: '₹30,000/year', eligibility: 'MBBS students with family income < ₹4.5 LPA', renewable: true },
      { name: 'AIIMS Special Award', type: 'Merit', amount: 20000, amountDesc: '₹20,000/year', eligibility: 'Rank 1-3 in MBBS batch', renewable: true },
      { name: 'SC/ST Special Scholarship', type: 'Category', amount: 50000, amountDesc: '₹50,000/year', eligibility: 'SC/ST students', renewable: true },
    ],
    entranceExams: ['NEET-UG', 'NEET-PG', 'AIIMS-PG'],
    admissionProcess: [
      { step: 1, title: 'NEET-UG Qualification', description: 'Appear and qualify NEET-UG conducted by NTA.' },
      { step: 2, title: 'MCC Counselling', description: 'Register for MCC (Medical Counselling Committee) counselling.' },
      { step: 3, title: 'Choice Filling', description: 'Fill AIIMS-specific seats in preference order.' },
      { step: 4, title: 'Seat Allotment', description: 'Seat allotted based on NEET rank and choices.' },
      { step: 5, title: 'Reporting & Document Verification', description: 'Report to AIIMS Delhi with original documents.' },
    ],
    reviews: [
      {
        id: 'r1', author: 'Dr. Meera Krishnan', isVerified: true, batch: 2019, program: 'MBBS',
        overallRating: 5, placementRating: 5, facultyRating: 5, infrastructureRating: 5,
        campusLifeRating: 4, valueForMoneyRating: 5,
        title: 'The pinnacle of medical education in India – absolutely life-changing',
        pros: 'Learning from the best clinicians in India. Patient diversity is unmatched. Research opportunities are exceptional. AIIMS tag opens every door in medicine globally. Fees are shockingly affordable at ₹7,000/year.',
        cons: 'Extremely competitive to get in (top 100-200 in NEET). Workload is immense. Work-life balance is challenging.',
        advice: 'Work hard to get here. It\'s worth every sacrifice. The training you receive is unparalleled.',
        helpful: 512, date: '2024-01-30', isCurrentStudent: false,
      },
    ],
    isFeatured: true,
    isPremium: true,
  },
  {
    id: '8',
    name: 'Indian Institute of Management Ahmedabad',
    shortName: 'IIM Ahmedabad',
    slug: 'iim-ahmedabad',
    collegeType: 'Management',
    ownershipType: 'Government',
    genderType: 'Co-Ed',
    city: 'Ahmedabad',
    state: 'Gujarat',
    address: 'Vastrapur, Ahmedabad, Gujarat 380015',
    establishedYear: 1961,
    website: 'https://www.iima.ac.in',
    phone: '+91 79 6632 4000',
    email: 'info@iima.ac.in',
    logoColor: '#bf360c',
    logoInitials: 'IIMA',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    aboutShort: 'India\'s #1 business school and one of the world\'s most prestigious – the Harvard of the East.',
    description: 'Indian Institute of Management Ahmedabad (IIMA), established in 1961, is India\'s most prestigious management institution and is consistently ranked among the top business schools globally. Located in Ahmedabad, Gujarat, the institute is famous for its iconic Louis Kahn–designed campus, rigorous two-year PGP program, and exceptional placement record. IIMA pioneered the case study method in India and has been instrumental in shaping India\'s business leadership. With alumni serving as CEOs and CFOs at top global corporations, IIMA has built an unparalleled legacy in management education.',
    vision: 'To be a world-class management institution that develops leaders for enterprise and society.',
    mission: 'To catalyse the transformation of management practice by advancing research and developing leaders with creative and principled management skills.',
    notableAlumni: [
      { name: 'Vikram Pandit', achievement: 'Former CEO of Citigroup', year: 1980 },
      { name: 'K.V. Kamath', achievement: 'Former MD & CEO of ICICI Bank, Former President of BRICS New Development Bank', year: 1974 },
      { name: 'Siddharth Lal', achievement: 'MD of Eicher Motors (Royal Enfield)', year: 1996 },
      { name: 'Sanjeev Bikhchandani', achievement: 'Founder of Naukri.com', year: 1989 },
    ],
    naacGrade: 'A++',
    naacCgpa: 3.89,
    naacYear: 2022,
    isNba: false,
    isAicte: true,
    isUgc: true,
    nirfRanking: 1,
    nirfCategory: 'Management',
    nirfYear: 2024,
    otherRankings: [
      { body: 'QS Global MBA Rankings', category: 'MBA', rank: 45, year: 2024 },
      { body: 'Financial Times Global MBA', category: 'MBA', rank: 38, year: 2024 },
      { body: 'NIRF', category: 'Overall', rank: 6, year: 2024 },
      { body: 'Economist Which MBA', category: 'MBA', rank: 34, year: 2024 },
    ],
    avgRating: 4.9,
    totalReviews: 987,
    campusSizeAcres: 98,
    totalFaculty: 107,
    phdFacultyPercent: 100,
    studentFacultyRatio: '8:1',
    totalStudents: 1350,
    totalDepartments: 12,
    internationalStudents: 28,
    minFeePerYear: 1200000,
    maxFeePerYear: 1400000,
    courses: [
      {
        id: 'c1', name: 'Post Graduate Programme in Management (PGP)', degreeLevel: 'PG', degreeType: 'MBA (PGP)',
        duration: '2 Years', totalFee: 2500000, feePerYear: 1250000, totalSeats: 420,
        avgPackageLpa: 32, highestPackageLpa: 7.5, placementPercentage: 100,
        mode: 'Full Time', examsAccepted: ['CAT'],
      },
      {
        id: 'c2', name: 'PGP in Food and Agribusiness Management (PGP-FABM)', degreeLevel: 'PG', degreeType: 'MBA',
        duration: '2 Years', totalFee: 2500000, feePerYear: 1250000, totalSeats: 42,
        avgPackageLpa: 18, highestPackageLpa: 2.5, placementPercentage: 100,
        mode: 'Full Time', examsAccepted: ['CAT'],
      },
      {
        id: 'c3', name: 'Executive MBA (One-Year)', degreeLevel: 'PG', degreeType: 'PGPX',
        duration: '1 Year', totalFee: 3500000, feePerYear: 3500000, totalSeats: 70,
        avgPackageLpa: 42, highestPackageLpa: 5.0, placementPercentage: 100,
        mode: 'Full Time', examsAccepted: ['GMAT', 'GRE', 'CAT'],
      },
    ],
    placements: [
      { year: 2024, totalEligible: 424, totalPlaced: 424, placementPercentage: 100, avgPackageLpa: 32.7, medianPackageLpa: 28, highestPackageLpa: 750, totalCompanies: 170, internationalOffers: 68, highestIntlPackageLpa: 750 },
      { year: 2023, totalEligible: 390, totalPlaced: 390, placementPercentage: 100, avgPackageLpa: 30.2, medianPackageLpa: 26, highestPackageLpa: 600, totalCompanies: 162, internationalOffers: 55, highestIntlPackageLpa: 600 },
    ],
    topRecruiters: ['McKinsey', 'BCG', 'Bain', 'Goldman Sachs', 'Morgan Stanley', 'JP Morgan', 'Google', 'Amazon', 'Flipkart', 'Accenture Strategy', 'Deloitte', 'ITC', 'Nestle', 'P&G', 'Hindustan Unilever'],
    facilities: [
      { name: 'Vikram Sarabhai Library', category: 'Academic', icon: '📚' },
      { name: 'Computer Labs', category: 'Technology', icon: '💻' },
      { name: 'Sports Complex', category: 'Sports', icon: '🏟️' },
      { name: 'Health Centre', category: 'Medical', icon: '🏥' },
      { name: 'Heritage Campus (Louis Kahn)', category: 'Recreation', icon: '🏛️' },
      { name: 'Faculty & Student Housing', category: 'Hostel', icon: '🏠' },
      { name: 'Multiple Cafeterias', category: 'Dining', icon: '🍽️' },
    ],
    hostels: [
      { type: 'Mixed', name: 'Student Dormitories', totalSeats: 900, feeMonthly: 12000, amenities: ['AC', 'Wi-Fi', 'Mess', 'Gym', 'Common Room', 'Study Lounge'], isOnCampus: true },
    ],
    scholarships: [
      { name: 'Need-Based Fellowship', type: 'Need', amount: 200000, amountDesc: '₹2 Lakh/year', eligibility: 'Family income < ₹5 LPA', renewable: true },
      { name: 'Merit Scholarship', type: 'Merit', amount: 300000, amountDesc: '₹3 Lakh/year', eligibility: 'Top 5% CGPA in PGP batch', renewable: true },
      { name: 'Alumni Endowed Scholarship', type: 'Merit', amount: 500000, amountDesc: '₹5 Lakh (one-time)', eligibility: 'Highest academic achievement in first year', renewable: false },
    ],
    entranceExams: ['CAT', 'GMAT', 'GRE'],
    admissionProcess: [
      { step: 1, title: 'CAT Registration', description: 'Register and appear for CAT. Aim for 99+ percentile for a realistic chance.' },
      { step: 2, title: 'IIMA Application', description: 'Apply on IIMA website with academic records, work experience, essays.' },
      { step: 3, title: 'Shortlisting', description: 'Shortlisted based on CAT percentile, academics, and work experience.' },
      { step: 4, title: 'WAT-PI Process', description: 'Written Ability Test followed by rigorous Personal Interview at IIM Ahmedabad.' },
      { step: 5, title: 'Final Merit List', description: 'Final admission based on composite score of CAT, WAT-PI, academics, and work experience.' },
    ],
    reviews: [
      {
        id: 'r1', author: 'Nikhil Kapoor', isVerified: true, batch: 2022, program: 'PGP MBA',
        overallRating: 5, placementRating: 5, facultyRating: 5, infrastructureRating: 5,
        campusLifeRating: 5, valueForMoneyRating: 4,
        title: 'If you can get in, there is nothing better for your career in India',
        pros: 'The alumni network is the most powerful thing about IIMA. Faculty are world-class. The case study learning is transformative. Placement at 100% with avg ₹32+ LPA speaks for itself. McKinsey, BCG, Goldman – you name it, they all come here.',
        cons: 'Fees have grown to ₹25L which is steep. Intense competition within the batch. Two years will fly by.',
        advice: 'Focus on all-round development here. The skills you build, the network you form – these will pay dividends for 40 years.',
        helpful: 578, date: '2024-04-20', isCurrentStudent: false,
      },
    ],
    isFeatured: true,
    isPremium: true,
  },
];

export const COLLEGE_TYPES = ['Engineering', 'Medical', 'Management', 'Law', 'Science', 'Arts & Humanities', 'Commerce', 'Design', 'Architecture', 'Pharmacy', 'Education', 'Multi-Discipline'];
export const OWNERSHIP_TYPES = ['Government', 'Government Aided', 'Private', 'Deemed Private', 'Autonomous'];
export const STATES = ['Andhra Pradesh', 'Delhi', 'Gujarat', 'Karnataka', 'Kerala', 'Maharashtra', 'Rajasthan', 'Tamil Nadu', 'Telangana', 'Uttar Pradesh', 'West Bengal'];
export const ENTRANCE_EXAMS = ['JEE Main', 'JEE Advanced', 'NEET-UG', 'CAT', 'GATE', 'BITSAT', 'VITEEE', 'CLAT', 'NATA', 'CEED', 'XAT', 'GMAT', 'MAT'];
export const DEGREE_LEVELS = ['UG (Bachelor\'s)', 'PG (Master\'s)', 'Ph.D', 'Diploma', 'Integrated'];

export const FEATURED_COLLEGES = MOCK_COLLEGES.filter(c => c.isFeatured);

export function getCollegeBySlug(slug: string): MockCollege | undefined {
  return MOCK_COLLEGES.find(c => c.slug === slug);
}

export function searchColleges(query: string): MockCollege[] {
  const q = query.toLowerCase();
  return MOCK_COLLEGES.filter(c =>
    c.name.toLowerCase().includes(q) ||
    c.shortName.toLowerCase().includes(q) ||
    c.city.toLowerCase().includes(q) ||
    c.state.toLowerCase().includes(q) ||
    c.collegeType.toLowerCase().includes(q)
  );
}

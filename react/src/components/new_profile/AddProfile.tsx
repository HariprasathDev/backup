import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Input from '../Fromfield/Inputfield';
import RasiGrid from '../HoroDetails/RasiGrid';
import AmsamGrid from '../HoroDetails/AmsamGrid';
import MatchingStars from '../PartnerPreference/MatchingStars';

const ProfileForm = () => {
  const initialDetails = {
    temp_profileid: '',
    Gender: '',
    Mobile_no: '',
    EmailId: '',
    Password: '',
    Profile_marital_status: '',
    Profile_dob: '',
    Profile_complexion: '',
    Profile_address: '',
    Profile_country: '',
    Profile_state: '',
    Profile_city: '',
    Profile_pincode: '',
    Profile_whatsapp: '',
    Profile_alternate_mobile: '',
  };

  const initialFamilyDetails = {
    father_name: '',
    father_occupation: '',
    mother_name: '',
    mother_occupation: '',
    family_name: '',
    about_self: '',
    hobbies: '',
    blood_group: '',
    Pysically_changed: '',
    property_details: '',
    property_worth: '',
    suya_gothram: '',
    uncle_gothram: '',
    ancestor_origin: '',
    about_family: '',
  };

  const initialEducationDetails = {
    highest_education: '',
    ug_degeree: '',
    about_edu: '',
    anual_income: '',
    actual_income: '',
    work_country: '',
    work_state: '',
    work_pincode: '',
    career_plans: '',
  };

  const initialPartnerPreferences = {
    pref_age_differences: '',
    from_month: '',
    from_year: '',
    age_pref: '',
    pref_height_from: '',
    pref_education: '',
    pref_profession: '',
    pref_chevvai: '',
    pref_anual_income: '',
    pref_ragukethu: '',
    pref_marital_status: '',
    pref_foreign_intrest: '',
    family_value_pref: '',
    place_of_stay_pref: '',
    city_pref: '',
  };

  const [rasiContent, setRasiContent] = useState([]);
  const [amsamContent, setAmsamContent] = useState([]);
  const [selectedMaritalStatuses, setSelectedMaritalStatuses] = useState<string[]>([]);
  const [propertyWorthOptions, setPropertyworth] = useState<Propertyworth[]>([]);
  const [selectedStarIds, setSelectedStarIds] = useState<string[]>([]);
  const [maritalStatuses, setMaritalStatuses] = useState<MaritalStatus[]>([]);
  const [StatePref, setStatePref] = useState<StatePref[]>([])
  const [selectedStatePref, setSelectedStatePref] = useState<string[]>([]);
  const [basicDetails, setBasicDetails] = useState(initialDetails);
  const [annualIncome, setAnnualIncome] = useState<AnnualIncome[]>([]);
  const [selectedAnnualIncomes, setSelectedAnnualIncomes] = useState<string[]>([]);
  const [familyDetails, setFamilyDetails] = useState(initialFamilyDetails);
  const [educationDetails, setEducationDetails] = useState(initialEducationDetails);
  const [partnerPreferences, setPartnerPreferences] = useState(initialPartnerPreferences);
  const [errors, setErrors] = useState({});
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [highestEducations, setHighestEducations] = useState([]);
  const [ugDegrees, setUgDegrees] = useState([]);
  const [annualIncomes, setAnnualIncomes] = useState([]);
  const [isPartnerPreferencesOpen, setIsPartnerPreferencesOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);
  const [matchStars, setMatchStars] = useState<MatchingStar[][]>([]);

  const onRasiContentsChange = (newContent: React.SetStateAction<never[]>) => {
    setRasiContent(newContent);
  };

  const onAmsamContentsChange = (newContent: React.SetStateAction<never[]>) => {
    setAmsamContent(newContent);
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'Mobile_no':
        return value.length === 10 && /^[0-9]+$/.test(value) ? '' : 'Invalid mobile number';
      case 'EmailId':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Invalid email';
      case 'Password':
        return value.length >= 6 ? '' : 'Password must be at least 6 characters';
      case 'Profile_pincode':
        return /^[0-9]{6}$/.test(value) ? '' : 'Invalid pincode';
      case 'father_name':
      case 'mother_name':
      case 'family_name':
      case 'about_self':
      case 'hobbies':
      case 'blood_group':
      case 'property_details':
      case 'suya_gothram':
      case 'uncle_gothram':
      case 'ancestor_origin':
      case 'about_family':
      case 'age_pref':

        return value.trim() === '' ? 'This field is required' : '';
      case 'father_occupation':
      case 'mother_occupation':
      case 'property_worth':
        return value === '' ? 'This field is required' : '';
      case 'Pysically_changed':
        return value === '' ? 'This field is required' : '';
      case 'highest_education':
      case 'ug_degeree':
      case 'about_edu':
      case 'anual_income':
      case 'work_country':
      case 'work_state':
      case 'work_pincode':
      case 'career_plans':
        return value === '' ? 'This field is required' : '';
      default:
        return value.trim() === '' ? 'This field is required' : '';
    }
  };
  const handleCheckboxChange = (updatedIds: string[]) => {
    setSelectedStarIds(updatedIds);
  };

  const handleInputChange = (e, section = 'basicDetails') => {
    const { name, value } = e.target;
    if (section === 'basicDetails') {
      setBasicDetails({ ...basicDetails, [name]: value });
    } else if (section === 'familyDetails') {
      setFamilyDetails({ ...familyDetails, [name]: value });
    } else if (section === 'educationDetails') {
      setEducationDetails({ ...educationDetails, [name]: value });
    } else if (section === 'partnerPreferences') {
      setPartnerPreferences({ ...partnerPreferences, [name]: value });
    }
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const toggleSection5 = () => {
    setIsPartnerPreferencesOpen(!isPartnerPreferencesOpen);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formErrors = {};
    let isValid = true;

    Object.keys(basicDetails).forEach((key) => {
      const error = validateField(key, basicDetails[key]);
      if (error) {
        formErrors[key] = error;
        isValid = false;
      }
    });

    Object.keys(familyDetails).forEach((key) => {
      const error = validateField(key, familyDetails[key]);
      if (error) {
        formErrors[key] = error;
        isValid = false;
      }
    });

    Object.keys(educationDetails).forEach((key) => {
      const error = validateField(key, educationDetails[key]);
      if (error) {
        formErrors[key] = error;
        isValid = false;
      }
    });

    Object.keys(partnerPreferences).forEach((key) => {
      const error = validateField(key, partnerPreferences[key]);
      if (error) {
        formErrors[key] = error;
        isValid = false;
      }
    });

    setErrors(formErrors);

    if (!isValid) {
      return;
    }

    try {
      const loginDetailsResponse = await axios.post('http://localhost:8000/api/logindetails/', basicDetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const profileId = loginDetailsResponse.data.ProfileId;

      await axios.post('http://localhost:8000/api/profile-familydetails/', {
        profile_id: profileId,
        ...familyDetails,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      await axios.post('http://localhost:8000/api/profile-edudetails/', {
        profile_id: profileId,
        ...educationDetails,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      await axios.post('http://localhost:8000/api/profile-partner-pref/', {
        profile_id: profileId,
        ...partnerPreferences,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      alert('Profile created successfully');
      setBasicDetails(initialDetails);  // Reset the form
      setFamilyDetails(initialFamilyDetails); // Reset family details form
      setEducationDetails(initialEducationDetails); // Reset education details form
      setPartnerPreferences(initialPartnerPreferences); // Reset partner preferences form
      setFormKey((prevKey) => prevKey + 1); // Update the formKey to trigger re-render
    } catch (error) {
      console.error('Error creating profile:', error);
      if (error.response) {
        console.error('Error response data:', error.response.data);
        alert(`Error creating profile: ${JSON.stringify(error.response.data)}`);
      } else {
        alert('Error creating profile. Please check the console for more details.');
      }
    }
  };


  useEffect(() => {
    const fetchMaritalStatuses = async () => {
      try {
        const response = await axios.post<{ [key: string]: MaritalStatus }>(`http://103.214.132.20:8000/auth/Get_Marital_Status/`);
        const options = Object.values(response.data);
        setMaritalStatuses(options);
      } catch (error) {
        console.error('Error fetching marital statuses:', error);
      }
    };

    fetchMaritalStatuses();
  }, []);


  useEffect(() => {
    const fetchPropertyWorth = async () => {
      try {
        const response = await axios.post(`http://103.214.132.20:8000/auth/Get_Property_Worth/`);
        const options = Object.values(response.data) as Propertyworth[];
        console.log(options);
        setPropertyworth(options);
      } catch (error) {
        console.error('Error fetching property worth options:', error);
      }
    };
    fetchPropertyWorth();
  }, []);

  useEffect(() => {
    const fetchAnnualIncome = async () => {
      try {
        const response = await axios.post(`http://103.214.132.20:8000/auth/Get_Annual_Income/`);
        const options = Object.values(response.data) as AnnualIncome[];
        setAnnualIncome(options);
      } catch (error) {
        console.error('Error fetching Annual Income options:', error);
      }
    };
    fetchAnnualIncome();
  }, []);

  useEffect(() => {
    const fetchStatePref = async () => {
      try {
        const response = await axios.post(`http://103.214.132.20:8000/auth/Get_State_Pref/`);
        const options = Object.values(response.data) as StatePref[];
        setStatePref(options);
      } catch (error) {
        console.error('Error fetching Annual Income options:', error);
      }
    };
    fetchStatePref();
  }, []);

  const storedBirthStar = 25;
  console.log(storedBirthStar)
  const storedGender = "female";


  useEffect(() => {
    if (storedBirthStar && storedGender) {
      const fetchMatchingStars = async () => {
        try {
          const response = await axios.post(`http://103.214.132.20:8000/auth/Get_Matchstr_Pref/`, {
            birth_star_id: storedBirthStar,
            gender: storedGender,
          });

          const matchCountArrays: MatchingStar[][] = Object.values(response.data).map((matchCount: any) => matchCount);
          setMatchStars(matchCountArrays);
          console.log('Response from server:', matchCountArrays);
        } catch (error) {
          console.error('Error fetching matching star options:', error);
        }
      };
      fetchMatchingStars();
    }
  }, [storedBirthStar, storedGender]);
  console.log(matchStars);


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/api/countries/');
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/api/states/');
        setStates(response.data);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchHighestEducations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/api/highest-educations/');
        setHighestEducations(response.data);
      } catch (error) {
        console.error("Error fetching highest educations:", error);
      }
    };

    fetchHighestEducations();

    const fetchUgDegrees = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/api/ug-degrees/');
        setUgDegrees(response.data);
      } catch (error) {
        console.error("Error fetching UG degrees:", error);
      }
    };

    fetchUgDegrees();

    const fetchAnnualIncomes = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/api/annual-incomes/');
        setAnnualIncomes(response.data);
      } catch (error) {
        console.error("Error fetching annual incomes:", error);
      }
    };

    fetchAnnualIncomes();
  }, []);


  const [isBasicDetailsOpen, setIsBasicDetailsOpen] = useState(true);
  const [isFamilyDetailsOpen, setIsFamilyDetailsOpen] = useState(true);
  const [isWorkLocationOpen, setIsWorkLocationOpen] = useState(true);
  const [isEducationDetailsOpen, setIsEducationDetailsOpen] = useState(true);
  const [isHoroscopeDetailsOpen, setIsHoroscopeDetailsOpen] = useState(true);
  const [isPartnerPreferenceOpen, setIsPartnerPreferenceOpen] = useState(true);
  const [isFeaturePrefenceOpen, setIsFeaturePrefenceOpen] = useState(true);

  const toggleSection1 = () => {
    setIsBasicDetailsOpen(!isBasicDetailsOpen);

  }
  const toggleSection2 = () => {
    setIsFamilyDetailsOpen(!isFamilyDetailsOpen);
  }
  const toggleSection3 = () => {
    setIsEducationDetailsOpen(!isEducationDetailsOpen);

  }
  const toggleSection4 = () => {
    setIsWorkLocationOpen(!isWorkLocationOpen);

  }
  const toggleSection6 = () => {
    setIsHoroscopeDetailsOpen(!isHoroscopeDetailsOpen);
  }
  const toggleSection7 = () => {
    setIsPartnerPreferenceOpen(!isPartnerPreferenceOpen);
  }
  const toggleSection8 = () => {
    setIsFeaturePrefenceOpen(!isFeaturePrefenceOpen);
  }

  return (
    <div>
      <form onSubmit={onSubmit} key={formKey}>
        <div className='bg-white p-5 mb-10 rounded shadow-md'>
          <h4 className="flex row items-center justify-between text-xl font-semibold text-black dark:text-white cursor-pointer  after-red-line::after" onClick={toggleSection1}>
            Basic Details
            <svg className={`fill-current transform ${isBasicDetailsOpen ? 'rotate-180' : ''}`} width={"20"} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z" fill=""></path></svg>
          </h4>
          {isBasicDetailsOpen && (
            <div className="flex flex-col gap-5">
              <div className="flex w-full flex-row gap-4">
                <div className="w-2/4">
                  <Input label={"Name"} name="temp_profileid" onChange={(e) => handleInputChange(e, 'basicDetails')} />
                  {errors.temp_profileid && <span className="text-red-500">{errors.temp_profileid}</span>}
                </div>
                <div className="w-2/4 py-1">
                  <label className="block text-black font-medium mb-1">Select Gender</label>
                  <input
                    type="radio"
                    value="Male"
                    name="Gender"
                    onChange={(e) => handleInputChange(e, 'basicDetails')}
                  />
                  <label className="text-black px-4">Male</label>
                  <input
                    type="radio"
                    value="Female"
                    name="Gender"
                    onChange={(e) => handleInputChange(e, 'basicDetails')}
                  />
                  <label className="text-black px-4">Female</label>
                  {errors.Gender && <span className="text-red-500">{errors.Gender}</span>}
                </div>
              </div>

              <div className="flex w-full flex-row gap-4">
                <div className="w-2/4">
                  <Input label={"Mobile Number"} name="Mobile_no" onChange={(e) => handleInputChange(e, 'basicDetails')} />
                  {errors.Mobile_no && <span className="text-red-500">{errors.Mobile_no}</span>}
                </div>
                <div className="w-2/4">
                  <Input label={"Email"} name="EmailId" onChange={(e) => handleInputChange(e, 'basicDetails')} />
                  {errors.EmailId && <span className="text-red-500">{errors.EmailId}</span>}
                </div>
              </div>
              <div className="flex w-full flex-row gap-4">
                <div className="w-2/4">
                  <Input label={"Whatsapp Number"} name="Profile_whatsapp" onChange={(e) => handleInputChange(e, 'basicDetails')} />
                  {errors.Profile_whatsapp && <span className="text-red-500">{errors.Profile_whatsapp}</span>}
                </div>
                <div className="w-2/4">
                  <Input label={"Alternate Mobile Number"} name="Profile_alternate_mobile" onChange={(e) => handleInputChange(e, 'basicDetails')} />
                  {errors.Profile_alternate_mobile && <span className="text-red-500">{errors.Profile_alternate_mobile}</span>}
                </div>
              </div>
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <Input label={"Create Password"} name="Password" onChange={(e) => handleInputChange(e, 'basicDetails')} />
                  {errors.Password && <span className="text-red-500">{errors.Password}</span>}
                </div>
                <div className="w-full">
                  <label className="block text-black font-medium mb-1">Select your Marital Status</label>
                  <select
                    name="Profile_marital_status"
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                    onChange={(e) => handleInputChange(e, 'basicDetails')}
                  >
                    <option value="">Select your Marital Status</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Not married">Not married</option>
                    <option value="Widow">Widow</option>
                    <option value="Widower">Widower</option>
                  </select>
                  {errors.Profile_marital_status && <span className="text-red-500">{errors.Profile_marital_status}</span>}
                </div>
              </div>

              <div className="flex w-full flex-row gap-4">
                <div className="w-2/4">
                  <Input label={"Date of Birth"} type={"date"} name="Profile_dob" onChange={(e) => handleInputChange(e, 'basicDetails')} />
                  {errors.Profile_dob && <span className="text-red-500">{errors.Profile_dob}</span>}
                </div>
                <div className="w-2/4">
                  <Input label={"Complexion"} type={"text"} name="Profile_complexion" onChange={(e) => handleInputChange(e, 'basicDetails')} />
                  {errors.Profile_complexion && <span className="text-red-500">{errors.Profile_complexion}</span>}
                </div>
              </div>

              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <Input label={"Address"} name="Profile_address" onChange={(e) => handleInputChange(e, 'basicDetails')} />
                  {errors.Profile_address && <span className="text-red-500">{errors.Profile_address}</span>}
                </div>
                <div className="w-full">
                  <label className="block text-black font-medium mb-1">Country</label>
                  <select
                    name="Profile_country"
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                    onChange={(e) => handleInputChange(e, 'basicDetails')}
                  >
                    <option value="">Country</option>
                    {countries.map((education) => (
                      <option key={education.id} value={education.name}>
                        {education.name}
                      </option>
                    ))}
                  </select>
                  {errors.Profile_country && <span className="text-red-500">{errors.Profile_country}</span>}
                </div>
              </div>
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <label className="block text-black font-medium mb-1">State (Based on country selection)</label>
                  <select
                    name="Profile_state"
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                    onChange={(e) => handleInputChange(e, 'basicDetails')}
                  >
                    <option value="">Select your state</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.name}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {errors.Profile_state && <span className="text-red-500">{errors.Profile_state}</span>}
                </div>

                <div className="w-full">
                  <label className="block text-black font-medium mb-1">City</label>
                  <select
                    name="Profile_city"
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                    onChange={(e) => handleInputChange(e, 'basicDetails')}
                  >
                    <option value="">Select your City</option>
                    <option value="option 1">option 1</option>
                    <option value="option 2">option 2</option>
                    <option value="option 3">option 3</option>
                  </select>
                  {errors.Profile_city && <span className="text-red-500">{errors.Profile_city}</span>}
                </div>
              </div>
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <Input label={"Pincode"} type={"text"} name="Profile_pincode" onChange={(e) => handleInputChange(e, 'basicDetails')} />
                  {errors.Profile_pincode && <span className="text-red-500">{errors.Profile_pincode}</span>}
                </div>
              </div>
              <h4 className="text-xl font-semibold text-black dark:text-white mb-4">For Admin Verification</h4>
              <div className="flex w-full flex-row gap-4">
                <div className="w-2/4">
                  <Input label={"Son Mobile Number"} name="" onChange={(e) => handleInputChange(e, 'basicDetails')} />

                </div>
                <div className="w-2/4">
                  <Input label={"Son Daughter Email"} name="" onChange={(e) => handleInputChange(e, 'basicDetails')} />

                </div>
              </div>
            </div>
          )}
        </div>


        <div className='bg-white p-5 mb-10 rounded shadow-md'>
          <h4 className="flex row items-center justify-between text-xl font-semibold text-black dark:text-white cursor-pointer" onClick={toggleSection2}>
            Family Details
            <svg className={`fill-current transform ${isFamilyDetailsOpen ? 'rotate-180' : ''}`} width={"20"} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z" fill=""></path></svg>
          </h4>
          {isFamilyDetailsOpen && (
            <div className="flex flex-col gap-5">
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <Input label={"Father name"} name="father_name" onChange={(e) => handleInputChange(e, 'familyDetails')} />
                  {errors.father_name && <span className="text-red-500">{errors.father_name}</span>}
                </div>
                <div className="w-full">
                  <label className="block text-black font-medium mb-1">Father Occupation</label>
                  <select
                    name="father_occupation"
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                    onChange={(e) => handleInputChange(e, 'familyDetails')}
                  >
                    <option value="">Father Occupation</option>
                    <option value="01">01</option>
                  </select>
                  {errors.father_occupation && <span className="text-red-600">{errors.father_occupation}</span>}
                </div>
              </div>
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <Input label={"Mother name"} name="mother_name" onChange={(e) => handleInputChange(e, 'familyDetails')} />
                  {errors.mother_name && <span className="text-red-500">{errors.mother_name}</span>}
                </div>
                <div className="w-full">
                  <label className="block text-black font-medium mb-1">Mother Occupation</label>
                  <select
                    name="mother_occupation"
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                    onChange={(e) => handleInputChange(e, 'familyDetails')}
                  >
                    <option value="">Mother Occupation</option>
                    <option value="02">02</option>
                  </select>
                  {errors.mother_occupation && <span className="text-red-600">{errors.mother_occupation}</span>}
                </div>
              </div>
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <Input label={"Family name"} type={"text"} name="family_name" onChange={(e) => handleInputChange(e, 'familyDetails')} />
                  {errors.family_name && <span className="text-red-500">{errors.family_name}</span>}
                </div>
                <div className="w-full">
                  <Input label={"About Myself"} type={"text"} name="about_self" onChange={(e) => handleInputChange(e, 'familyDetails')} />
                  {errors.about_self && <span className="text-red-500">{errors.about_self}</span>}
                </div>
              </div>

              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <Input label={"My Hobbies"} type={"text"} name="hobbies" onChange={(e) => handleInputChange(e, 'familyDetails')} />
                  {errors.hobbies && <span className="text-red-500">{errors.hobbies}</span>}
                </div>
                <div className="w-full">
                  <Input label={"Blood Group"} type={"text"} name="blood_group" onChange={(e) => handleInputChange(e, 'familyDetails')} />
                  {errors.blood_group && <span className="text-red-500">{errors.blood_group}</span>}
                </div>
              </div>
              <div className="flex w-full flex-row gap-4">
                <div className="w-full py-1">
                  <label className="block text-black font-medium mb-1">Physically Challenged</label>
                  <input
                    type="radio"
                    value="Yes"
                    name="Pysically_changed"
                    onChange={(e) => handleInputChange(e, 'familyDetails')}
                  />
                  <label className="text-black px-4">Yes</label>
                  <input
                    type="radio"
                    value="No"
                    name="Pysically_changed"
                    onChange={(e) => handleInputChange(e, 'familyDetails')}
                  />
                  <label className="text-black px-4">No</label>
                  {errors.Pysically_changed && <span className="text-red-600">Physically Challenged is required</span>}
                </div>
                <div className="w-full">
                  <Input label={"Property Details"} type={"text"} name="property_details" onChange={(e) => handleInputChange(e, 'familyDetails')} />
                  {errors.property_details && <span className="text-red-500">{errors.property_details}</span>}
                </div>
              </div>
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <label className="block text-black font-medium mb-1">Property Worth</label>
                  <select
                    name="property_worth"
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                    onChange={(e) => handleInputChange(e, 'familyDetails')}
                  >
                    <option value="">Select property worth</option>
                    <option value="Residential Property">Residential Property</option>
                    <option value="Commercial Property">Commercial Property</option>
                    <option value="Industrial Property">Industrial Property</option>
                    <option value="Agricultural Land">Agricultural Land</option>
                    <option value="Vacant Land">Vacant Land</option>
                  </select>
                  {errors.property_worth && <span className="text-red-600">Property Worth is required</span>}
                </div>
                <div className="w-full">
                  <Input label={"Suya Gothram"} name="suya_gothram" onChange={(e) => handleInputChange(e, 'familyDetails')} />
                  {errors.suya_gothram && <span className="text-red-500">{errors.suya_gothram}</span>}
                </div>
              </div>
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <Input label={"Uncle Gothram"} type={"text"} name="uncle_gothram" onChange={(e) => handleInputChange(e, 'familyDetails')} />
                  {errors.uncle_gothram && <span className="text-red-500">{errors.uncle_gothram}</span>}
                </div>
                <div className="w-full">
                  <Input label={"Ancestor Origin"} type={"text"} name="ancestor_origin" onChange={(e) => handleInputChange(e, 'familyDetails')} />
                  {errors.ancestor_origin && <span className="text-red-500">{errors.ancestor_origin}</span>}
                </div>
              </div>
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <label className="block text-black font-medium mb-1">About my Family</label>
                  <textarea
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                    name="about_family"
                    onChange={(e) => handleInputChange(e, 'familyDetails')}
                  ></textarea>
                  {errors.about_family && <span className="text-red-600">About my Family is required</span>}
                </div>
              </div>


            </div>
          )}
        </div>




        <div className='bg-white p-5 mb-10 rounded shadow-md'>
          <h4 className=" flex row items-center justify-between text-xl font-semibold text-black dark:text-white cursor-pointer" onClick={toggleSection3}>
            Education Details
            <svg className={`fill-current transform ${isEducationDetailsOpen ? 'rotate-180' : ''}`} width={"20"} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z" fill=""></path></svg>
          </h4>
          {isEducationDetailsOpen && (
            <div className="flex flex-col gap-5">
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <label className="block text-black font-medium mb-1">Highest Education Level *</label>
                  <select
                    name="highest_education"
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                    onChange={(e) => handleInputChange(e, 'educationDetails')}
                  >
                    <option value="">Select education level</option>
                    {highestEducations.map((education) => (
                      <option key={education.id} value={education.degree}>
                        {education.degree}
                      </option>
                    ))}
                  </select>
                  {errors.highest_education && <span className="text-red-500">{errors.highest_education}</span>}
                </div>
                <div className="w-full">
                  <label className="block text-black font-medium mb-1">UG Degree (Only if masters selected in highest education)</label>
                  <select
                    name="ug_degeree"
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                    onChange={(e) => handleInputChange(e, 'educationDetails')}
                  >
                    <option value="">Select education level</option>
                    {ugDegrees.map((education) => (
                      <option key={education.id} value={education.degree}>
                        {education.degree}
                      </option>
                    ))}
                  </select>
                  {errors.ug_degeree && <span className="text-red-500">{errors.ug_degeree}</span>}
                </div>
              </div>
              <div className="flex w-full flex-row gap-4">
                <Input label={"About your Education *"} name="about_edu" onChange={(e) => handleInputChange(e, 'educationDetails')} />
                <div className="w-full">
                  <label className="block text-black font-medium mb-1">Annual Income</label>
                  <select
                    name="anual_income"
                    className="outline-none w-full px-4 py-2 border border-black rounded"
                    onChange={(e) => handleInputChange(e, 'educationDetails')}
                  >
                    <option value="">Annual Income</option>
                    {annualIncomes.map((education) => (
                      <option key={education.id} value={education.income}>
                        {education.income}
                      </option>
                    ))}
                  </select>
                  {errors.anual_income && <span className="text-red-500">{errors.anual_income}</span>}
                </div>
              </div>


              <div className="flex w-full flex-row gap-4">
                <Input label={"Actual Income"} name="actual_income" onChange={(e) => handleInputChange(e, 'educationDetails')} />
              </div>

              <div className="mt-3">
                <h1 className="mb-3">Profession</h1>

                <div className="w-full inline-flex rounded">
                  {["Employed", "Business", "Student", "Not Working", "Not Mentioned"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      className="w-full px-5 py-3 text-sm font-medium border"
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>













        {/* Work Location */}
        <div className='bg-white p-5 mb-10 rounded shadow-md'>
          <h4 className=" flex row items-center justify-between text-xl font-semibold text-black dark:text-white cursor-pointer" onClick={toggleSection4}>
            Work Location
            <svg className={`fill-current transform ${isWorkLocationOpen ? 'rotate-180' : ''}`} width={"20"} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z" fill=""></path></svg>
          </h4>
          {isWorkLocationOpen && (
            <><div className="flex w-full flex-row gap-4">
              <div className="w-full">
                <label className="block text-black font-medium mb-1">Country *</label>
                <select
                  name="work_country"
                  className="outline-none w-full px-4 py-2 border border-black rounded"
                  onChange={(e) => handleInputChange(e, 'educationDetails')}
                >
                  <option value="">Country</option>
                  {countries.map((education) => (
                    <option key={education.id} value={education.name}>
                      {education.name}
                    </option>
                  ))}
                </select>
                {errors.work_country && <span className="text-red-500">{errors.work_country}</span>}
              </div>
              <div className="w-full">
                <label className="block text-black font-medium mb-1">State * (Based on country selection)</label>
                <select
                  name="work_state"
                  className="outline-none w-full px-4 py-2 border border-black rounded"
                  onChange={(e) => handleInputChange(e, 'educationDetails')}
                >
                  <option value="">Select your state</option>
                  {states.map((state) => (
                    <option key={state.id} value={state.name}>
                      {state.name}
                    </option>
                  ))}
                </select>
                {errors.work_state && <span className="text-red-500">{errors.work_state}</span>}
              </div>
            </div><div className="flex w-full flex-row gap-4">
                <div className="flex w-full flex-row gap-4">
                  <Input label={"Pincode (Based on Country Selection)"} name="work_pincode" onChange={(e) => handleInputChange(e, 'educationDetails')} />
                </div>
                <div className="flex w-full flex-row gap-4">
                  <div className="w-full">
                    <label className="block text-black font-medium mb-1">Career Plans / Notes</label>
                    <textarea
                      className="outline-none w-full px-4 py-2 border border-black rounded"
                      name="career_plans"
                      onChange={(e) => handleInputChange(e, 'educationDetails')}
                    ></textarea>
                    {errors.career_plans && <span className="text-red-500">{errors.career_plans}</span>}
                  </div>
                </div>
              </div></>
          )}
        </div>





















        {/* Horoscope Details */}
        <div className='bg-white p-5 mb-10 rounded shadow-md' >
          <h4 className=" flex row items-center justify-between text-xl font-semibold text-black dark:text-white cursor-pointer" onClick={toggleSection6}>
            Horoscope Details
            <svg className={`fill-current transform ${isHoroscopeDetailsOpen ? 'rotate-180' : ''}`} width={"20"} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z" fill=""></path></svg>
          </h4>
          {isHoroscopeDetailsOpen && (
            <><div className="flex flex-col gap-5">
              <div className="flex w-full flex-row gap-4">
                <Input type={"time"} label={"Time of Birth"} />
                <Input label={"Place of Birth"} />
              </div>
            </div><div>
                <label htmlFor="birthStar" className="block mb-1">
                  Birth Star
                </label>
                <select
                  id="birthStar"
                  className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                >
                  <option value="" disabled selected>
                    -- Select your Birth Star --
                  </option>
                  <option value="1">Birth Star 1</option>
                  <option value="2">Birth Star 2</option>
                  <option value="3">Birth Star 3</option>
                  {/* Add more static options as needed */}
                </select>
                {/* Remove errors handling */}


                <div>
                  <label htmlFor="rasi">
                    Rasi
                  </label>
                  <select
                    id="rasi"
                    className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                  >
                    <option value="" disabled selected>
                      -- Select your Rasi --
                    </option>
                    <option value="1">Rasi 1</option>
                    <option value="2">Rasi 2</option>
                    <option value="3">Rasi 3</option>
                    {/* Add more static options as needed */}
                  </select>
                  {/* Remove errors handling */}
                </div>
              </div><div>
                <label htmlFor="lagnam" className="block mb-1">
                  lagnam / Didi
                </label>
                <select
                  id="lagnam"
                  className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                >
                  <option value="" disabled selected>
                    -- Select your lagnam / Didi --
                  </option>
                  <option value="1">Didi 1 Description</option>
                  <option value="2">Didi 2 Description</option>
                  <option value="3">Didi 3 Description</option>
                  {/* Add more static options as needed */}
                </select>
                {/* Remove errors handling */}
              </div><div>
                <label htmlFor="chevvaiDhosam" className="block mb-1">
                  Chevvai Dhosam
                </label>
                <select
                  id="chevvaiDhosam"
                  className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                >
                  <option value="" disabled>
                    -- Select Chevvai Dhosam --
                  </option>
                  <option value="UnKnown">UnKnown</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>

                <label htmlFor="sarpaDhosham" className="block mb-1">
                  Sarpa Dhosham
                </label>
                <select
                  id="sarpaDhosham"
                  className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                >
                  <option value="" disabled>
                    -- Select Sarpa Dhosham --
                  </option>
                  <option value="UnKnown">UnKnown</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                <div>
                </div>
              </div><div>
                <label htmlFor="naalikai" className="block mb-1">
                  Naalikai
                </label>
                <input
                  id="naalikai"
                  type="text"
                  className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded" />
              </div><div>
                <label htmlFor="dasaName" className="block mb-1">
                  Dasa Name
                </label>
                <input
                  id="dasaName"
                  type="text"
                  className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded" />
              </div><div>
                <label htmlFor="dateOfBirth" className="block mb-1">Dasa Balance</label>
                <div className="flex space-x-2">
                  <div>
                    <select
                      id="day"
                      className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                    >
                      <option value="" disabled>Day</option>
                      {[...Array(31)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      id="month"
                      className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                    >
                      <option value="" disabled>Month</option>
                      {[...Array(12)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <select
                      id="year"
                      className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded"
                    >
                      <option value="" disabled>Year</option>
                      {Array.from({ length: 30 }, (_, i) => i + 1).map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div><div>
                <label htmlFor="dasaName" className="block mb-1">
                  Horoscope Hints
                </label>
                <input
                  id="dasaName"
                  type="text"
                  className="outline-none w-full px-4 py-1.5 border border-ashSecondary rounded" />
              </div><div>
                <h4 className="text-xl font-semibold text-black dark:text-white mb-4">Rasi Grid</h4>
                <RasiGrid centerLabel={"Rasi"} onRasiContentsChange={onRasiContentsChange} /></div><br /><div>
                <h4 className="text-xl font-semibold text-black dark:text-white mb-4">Amsam Grid</h4>
                <AmsamGrid centerLabel={"Amsam"} onAmsamContentsChange={onAmsamContentsChange} />
              </div></>
          )}
        </div>


















        {/* Partner Preference */}
        <div className='bg-white p-5 mb-10 rounded shadow-md' >
          <h4 className="flex row items-center justify-between text-xl font-semibold text-black dark:text-white cursor-pointer" onClick={toggleSection5}>
          Partner Preference
            <svg className={`fill-current transform ${isPartnerPreferencesOpen ? 'rotate-180' : ''}`} width={"20"} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z" fill=""></path></svg>
          </h4>
          {isPartnerPreferencesOpen && (
            <div className='flex flex-col gap-4 mt-4' >
              <div className="flex flex-col gap-5">
                <div className="flex w-full flex-row gap-4">
                  <div className="w-full">
                    <div className="w-full">
                      <label className="block text-black font-medium mb-1">Select your Marital Status</label>
                      <select
                        name="pref_age_differences"
                        className="outline-none w-full px-4 py-2 border border-black rounded"
                        onChange={(e) => handleInputChange(e, 'basicDetails')}
                      >
                        <option value="">Select your Marital Status</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>

                      </select>
                    </div>
                  </div>
                  <div className="w-full">
                    <Input label={"Height from"} name="from_month" onChange={(e) => handleInputChange(e, 'partnerPreferences')} />
                    {errors.age_pref && <span className="text-red-500">From Month is required</span>}
                  </div>
                  <div className="w-full">
                    <Input label={"Height To"} name="from_year" onChange={(e) => handleInputChange(e, 'partnerPreferences')} />
                    {errors.from_year && <span className="text-red-500">From Year is required</span>}
                  </div>
                </div>
                <div className="flex w-full flex-row gap-4">
                  <div className="w-full">
                    <Input label={"Age Preference"} name="age_pref" onChange={(e) => handleInputChange(e, 'partnerPreferences')} />
                    {errors.age_pref && <span className="text-red-500">{errors.age_pref}</span>}
                  </div>
                  <div className="w-full">
                    <Input label={"Height Preference"} name="pref_height_from" onChange={(e) => handleInputChange(e, 'partnerPreferences')} />
                    {errors.pref_height_from && <span className="text-red-500">Height Preference is required</span>}
                  </div>
                </div>
                <div className="flex w-full flex-row gap-4">
                  <div className="w-full">
                    <div className="w-full">
                      <label className="block text-black font-medium mb-1">Chevvai</label>
                      <select
                        name="pref_chevvai"
                        className="outline-none w-full px-4 py-2 border border-black rounded"
                        onChange={(e) => handleInputChange(e, 'basicDetails')}
                      >
                        <option value="">Chevvai</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex w-full flex-row gap-4">
                      <div className="w-full">
                        <div className="w-full">
                          <label className="block text-black font-medium mb-1">Rehu / Ketu</label>
                          <select
                            name="pref_ragukethu"
                            className="outline-none w-full px-4 py-2 border border-black rounded"
                            onChange={(e) => handleInputChange(e, 'basicDetails')}
                          >
                            <option value="">Rehu / Ketu</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-row gap-4">
                  <div className="w-full">
                    <div className="w-full">
                      <label className="block text-black font-medium mb-1">Foreign Interest</label>
                      <select
                        name="pref_foreign_intres"
                        className="outline-none w-full px-4 py-2 border border-black rounded"
                        onChange={(e) => handleInputChange(e, 'basicDetails')}
                      >
                        <option value="">Foreign Interest</option>
                        <option value="Both">Both</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                </div>



                <div className="w-full">
                  <div>
                  <h4 className="text-xl font-semibold text-black dark:text-white mb-4">Profession</h4>
                    <div className="flex justify-between items-center">
                      <div>
                        <input
                          type="checkbox"
                          id="employed"
                          name="pref_profession"
                          value="employed"
                        />
                        <label htmlFor="employed" className="pl-1">Employed</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="business"
                          name="pref_profession"
                          value="business"
                        />
                        <label htmlFor="business" className="pl-1">Business</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="student"
                          name="pref_profession"
                          value="student"
                        />
                        <label htmlFor="student" className="pl-1">Student</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="notWorking"
                          name="pref_profession"
                          value="notWorking"
                        />
                        <label htmlFor="notWorking" className="pl-1">Not Working</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="notMentioned"
                          name="pref_profession"
                          value="notMentioned"
                        />
                        <label htmlFor="notMentioned" className="pl-1">Not Mentioned</label>
                      </div>
                    </div>
                  </div>
                </div>


              </div>

              <div>
                <h5 className="text-[18px] text-black font-semibold mb-2">Marital Status</h5>
                <div className="flex justify-between items-center">
                  {maritalStatuses.map(status => (
                    <div key={status.marital_sts_id}>
                      <input
                        type="checkbox"
                        id={`maritalStatus-${status.marital_sts_id}`}
                        value={status.marital_sts_id.toString()}
                        checked={selectedMaritalStatuses.includes(status.marital_sts_id.toString())}
                        onChange={(e) => handleMaritalStatusChange(status.marital_sts_id.toString(), e.target.checked)}
                      />
                      <label htmlFor={`maritalStatus-${status.marital_sts_id}`}>{status.marital_sts_name}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[18px] text-black font-semibold mb-2">Annual Income</label>
                <div className="grid grid-rows-1 grid-cols-5">
                  {annualIncome.map((option) => (
                    <div key={option.income_id} className="mb-2">
                      <input
                        type="checkbox"
                        id={`annualIncome-${option.income_id}`}
                        value={option.income_id.toString()}
                        checked={selectedAnnualIncomes.includes(option.income_id.toString())}
                        onChange={(e) => handleAnnualIncomeChange(option.income_id.toString(), e.target.checked)}
                      />
                      <label htmlFor={`annualIncome-${option.income_id}`} className="pl-1">
                        {option.income_description}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[18px] text-black font-semibold mb-2">State Preference</label>
                <div className="grid grid-rows-1 grid-cols-5">
                  {StatePref.map((option) => (
                    <div key={option.State_Pref_id} className="mb-2">
                      <input
                        type="checkbox"
                        id={`StatePreference-${option.State_Pref_id}`}
                        value={option.State_Pref_id.toString()}
                        checked={selectedStatePref.includes(option.State_Pref_id.toString())}
                        onChange={(e) => handleStatePreference(option.State_Pref_id.toString(), e.target.checked)}
                      />
                      <label htmlFor={`StatePreference-${option.State_Pref_id}`} className="pl-1">
                        {option.State_name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="justify-start items-center gap-x-5 text-black">
                  {matchStars
                    .sort((a, b) => b[0].match_count - a[0].match_count)
                    .map((matchCountArray, index) => {
                      const starAndRasi = matchCountArray.map(star => ({
                        id: star.id.toString(),
                        star: star.matching_starname,
                        rasi: star.matching_rasiname,
                      }));

                      const matchCountValue = matchCountArray[0].match_count;

                      return (
                        <MatchingStars
                          key={index}
                          initialPoruthas={`No of porutham ${matchCountValue}`}
                          starAndRasi={starAndRasi}
                          selectedStarIds={selectedStarIds}
                          onCheckboxChange={handleCheckboxChange}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          )}
        </div>











        {/* feature_preference */}
        <div className='bg-white p-5 mb-10 rounded shadow-md'>
          <h4 className="flex row items-center justify-between text-xl font-semibold text-black dark:text-white cursor-pointer" onClick={toggleSection8}>
            Feature Preference
            <svg className={`fill-current transform ${isFeaturePrefenceOpen ? 'rotate-180' : ''}`} width={"20"} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z" fill=""></path>
            </svg>
          </h4>
          {isFeaturePrefenceOpen && (

            <div className="flex flex-col gap-5">
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <div className="w-full">
                    <label className="block text-black font-medium mb-1">Select your Marital Status</label>
                    <select
                      name="feature_preference"
                      className="outline-none w-full px-4 py-2 border border-black rounded"
                      onChange={(e) => handleInputChange(e, 'basicDetails')}
                    >
                      <option value="">Select your Marital Status</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                    {errors.feature_preference && <span className="text-red-500">{errors.feature_preference}</span>}
                  </div>
                </div>
                <div className="w-full">
                  <Input label={"Height from"} name="feature_preference" onChange={(e) => handleInputChange(e, 'partnerPreferences')} />
                  {errors.age_pref && <span className="text-red-500">From Month is required</span>}
                </div>
                <div className="w-full">
                  <Input label={"Height To"} name="feature_preference" onChange={(e) => handleInputChange(e, 'partnerPreferences')} />
                  {errors.from_year && <span className="text-red-500">From Year is required</span>}
                </div>
              </div>
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <Input label={"Age Preference"} name="feature_preference" onChange={(e) => handleInputChange(e, 'partnerPreferences')} />
                  {errors.age_pref && <span className="text-red-500">{errors.age_pref}</span>}
                </div>
                <div className="w-full">
                  <Input label={"Height Preference"} name="feature_preference" onChange={(e) => handleInputChange(e, 'partnerPreferences')} />
                  {errors.feature_preference && <span className="text-red-500">Height Preference is required</span>}
                </div>
              </div>
              <div className="flex w-full flex-row gap-4">
                <div className="w-full">
                  <div className="w-full">
                    <label className="block text-black font-medium mb-1">Chevvai</label>
                    <select
                      name="feature_preference"
                      className="outline-none w-full px-4 py-2 border border-black rounded"
                      onChange={(e) => handleInputChange(e, 'basicDetails')}
                    >
                      <option value="">Chevvai</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                    {errors.feature_preference && <span className="text-red-500">required</span>}
                  </div>
                </div>
                <div className="w-full">
                  <div className="flex w-full flex-row gap-4">
                    <div className="w-full">
                      <div className="w-full">
                        <label className="block text-black font-medium mb-1">Rehu / Ketu</label>
                        <select
                          name="feature_preference"
                          className="outline-none w-full px-4 py-2 border border-black rounded"
                          onChange={(e) => handleInputChange(e, 'basicDetails')}
                        >
                          <option value="">Rehu / Ketu</option>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                        {errors.feature_preference && <span className="text-red-500">Rahu/Ketu Dhosham is required</span>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex w-full flex-row gap-4">
                <div className='w-full'>
                  <div className="w-full">
                    <label className="block text-black font-medium mb-1">Foreign Interest</label>
                    <select
                      name="feature_preference"
                      className="outline-none w-full px-4 py-2 border border-black rounded"
                      onChange={(e) => handleInputChange(e, 'basicDetails')}
                    >
                      <option value="">Foreign Interest</option>
                      <option value="Both">Both</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  {errors.feature_preference && <span className="text-red-500">Foreign Interest is required</span>}
                </div>
              </div>

              <div className="w-full">
                <div>
                <h4 className="text-xl font-semibold text-black dark:text-white mb-4">Profession</h4>
                  <div className="flex justify-between items-center">
                    <div>
                      <input
                        type="checkbox"
                        id="feature_preference"
                        name="feature_preference"
                        value="employed"
                      />
                      <label htmlFor="feature_preference" className="pl-1">Employed</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="feature_preference"
                        name="feature_preference"
                        value="business"
                      />
                      <label htmlFor="feature_preference" className="pl-1">Business</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="feature_preference"
                        name="feature_preference"
                        value="student"
                      />
                      <label htmlFor="feature_preference" className="pl-1">Student</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="feature_preference"
                        name="feature_preference"
                        value="notWorking"
                      />
                      <label htmlFor="feature_preference" className="pl-1">Not Working</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="feature_preference"
                        name="feature_preference"
                        value="notMentioned"
                      />
                      <label htmlFor="feature_preference" className="pl-1">Not Mentioned</label>
                    </div>
                  </div>
                </div>
                {errors.feature_preference && <span className="text-red-500">Profession Preference is required</span>}
              </div>
              <div>
                <h5 className="text-[18px] text-black font-semibold mb-2">Marital Status</h5>
                <div className="flex justify-between items-center">
                  {maritalStatuses.map(status => (
                    <div key={status.marital_sts_id}>
                      <input
                        type="checkbox"
                        id={`maritalStatus-${status.marital_sts_id}`}
                        value={status.marital_sts_id.toString()}
                        checked={selectedMaritalStatuses.includes(status.marital_sts_id.toString())}
                        onChange={(e) => handleMaritalStatusChange(status.marital_sts_id.toString(), e.target.checked)}
                      />
                      <label htmlFor={`maritalStatus-${status.marital_sts_id}`}>{status.marital_sts_name}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[18px] text-black font-semibold mb-2">Annual Income</label>
                <div className="grid grid-rows-1 grid-cols-5">
                  {annualIncome.map((option) => (
                    <div key={option.income_id} className="mb-2">
                      <input
                        type="checkbox"
                        id={`annualIncome-${option.income_id}`}
                        value={option.income_id.toString()}
                        checked={selectedAnnualIncomes.includes(option.income_id.toString())}
                        onChange={(e) => handleAnnualIncomeChange(option.income_id.toString(), e.target.checked)}
                      />
                      <label htmlFor={`annualIncome-${option.income_id}`} className="pl-1">
                        {option.income_description}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[18px] text-black font-semibold mb-2">State Preference</label>
                <div className="grid grid-rows-1 grid-cols-5">
                  {StatePref.map((option) => (
                    <div key={option.State_Pref_id} className="mb-2">
                      <input
                        type="checkbox"
                        id={`StatePreference-${option.State_Pref_id}`}
                        value={option.State_Pref_id.toString()}
                        checked={selectedStatePref.includes(option.State_Pref_id.toString())}
                        onChange={(e) => handleStatePreference(option.State_Pref_id.toString(), e.target.checked)}
                      />
                      <label htmlFor={`StatePreference-${option.State_Pref_id}`} className="pl-1">
                        {option.State_name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="justify-start items-center gap-x-5 text-black">
                  {matchStars
                    .sort((a, b) => b[0].match_count - a[0].match_count)
                    .map((matchCountArray, index) => {
                      const starAndRasi = matchCountArray.map(star => ({
                        id: star.id.toString(),
                        star: star.matching_starname,
                        rasi: star.matching_rasiname,
                      }));

                      const matchCountValue = matchCountArray[0].match_count;

                      return (
                        <MatchingStars
                          key={index}
                          initialPoruthas={`No of porutham ${matchCountValue}`}
                          starAndRasi={starAndRasi}
                          selectedStarIds={selectedStarIds}
                          onCheckboxChange={handleCheckboxChange}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          )}
        </div>

      </form>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Submit</button>

    </div >
  );
};

export default ProfileForm;

import User from "../models/user.model.js";
import { myphotosUpload, profilePicUpload } from "../utils/cloudinary.js";
import { deleteToken, generateToken } from "../utils/generateToken.js";
import { deleteLocalFile } from "../utils/multer.js";
import bcrypt from "bcrypt";

export const userRegistration = async (req, res) => {
  const {
    userName,
    email,
    password,
    firstName,
    lastName,
    gender,
    // age,
    bio,
    mobile_no,
    dob,
    religion,
    maritalStatus,
    motherTongue,
    nationality,
    education,
    occupation,
    income,
    city,
    state,
    country,
    height,
    weight,
    hobbies,
    you_live_with_family,
    diet,
  } = req.body;

  const profilePicture = req.file;

  console.log(userName);
  if (!userName) {
    return res.status(400).json({ message: "Username is required" });
  }

  const userNameExists = await User.findOne({ userName });
  if (userNameExists) {
    return res.status(400).json({ message: "Username already exists" });
  }

  if (userName.length < 8) {
    return res
      .status(400)
      .json({ message: "Username must be at least 8 characters" });
  }

  if (userName.length > 20) {
    return res
      .status(400)
      .json({ message: "Username must be at most 20 characters" });
  }

  if (!/^[a-zA-Z0-9]+$/.test(userName)) {
    return res.status(400).json({ message: "Username must be alphanumeric" });
  }

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(400).json({ message: "Email already exists" });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (!password) {
    return res.status(400).json({ message: "Password is required" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "Password must be at least 8 characters" });
  }

  if (password.length > 20) {
    return res
      .status(400)
      .json({ message: "Password must be at most 20 characters" });
  }

  if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/.test(password)) {
    return res.status(400).json({
      message:
        "Password is weak, It must contains at least one uppercase letter, lowercase letter, one number and one special character",
    });
  }

  if (!firstName) {
    return res.status(400).json({ message: "First name is required" });
  }

  if (!lastName) {
    return res.status(400).json({ message: "Last name is required" });
  }

  if (!gender) {
    return res.status(400).json({ message: "Gender is required" });
  }

  const validGenders = ["male", "female"];
  if (!validGenders.includes(gender.toLowerCase())) {
    return res
      .status(400)
      .json({ message: "Gender must be either male, female, or other" });
  }

  // check for the dob birthdate that dob is required and must be at least 18 years old and calculate the age of the user from the dob and save it in the age field
  if (!dob) {
    return res.status(400).json({ message: "Date of birth is required" });
  }

  const dobDate = new Date(dob);
  const currentDate = new Date();

  const ageDiff = currentDate - dobDate;
  const ageDate = new Date(ageDiff);
  const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
  if (calculatedAge < 18) {
    return res
      .status(400)
      .json({ message: "User must be at least 18 years old" });
  }

  const age = calculatedAge;

  if (!bio) {
    return res.status(400).json({ message: "Bio is required" });
  }

  if (!mobile_no) {
    return res.status(400).json({ message: "Mobile number is required" });
  }

  if (!/^[0-9]{10}$/.test(mobile_no)) {
    return res.status(400).json({ message: "Invalid mobile number" });
  }

  // check the mobile number is unique
  const mobile = await User.findOne({ mobile_no });

  if (mobile) {
    return res.status(400).json({ message: "Mobile number already exists" });
  }

  if (!religion) {
    return res.status(400).json({ message: "Religion is required" });
  }

  const validReligions = [
    "hindu",
    "muslim",
    "christian",
    "sikh",
    "jain",
    "buddhist",
  ];
  if (!validReligions.includes(religion.toLowerCase())) {
    return res.status(400).json({
      message:
        "Religion must be either Hindu, Muslim, Christian, Sikh, Jain, Buddhist, or Other",
    });
  }

  if (!maritalStatus) {
    return res.status(400).json({ message: "Marital status is required" });
  }

  const validMaritalStatus = ["single", "married", "divorced", "widowed"];

  if (!validMaritalStatus.includes(maritalStatus.toLowerCase())) {
    return res.status(400).json({ message: "Invalid marital status" });
  }

  if (!motherTongue) {
    return res.status(400).json({ message: "Mother tongue is required" });
  }

  const validMotherTongues = [
    "hindi",
    "english",
    "punjabi",
    "bengali",
    "tamil",
    "telugu",
    "marathi",
    "urdu",
    "kannada",
    "gujarati",
    "odisha",
    "malayalam",
  ];
  if (!validMotherTongues.includes(motherTongue.toLowerCase())) {
    return res.status(400).json({ message: "Invalid mother tongue" });
  }

  if (!nationality) {
    return res.status(400).json({ message: "Nationality is required" });
  }

  const validNationalities = [
    "indian",
    "american",
    "british",
    "australian",
    "canadian",
  ];

  if (!validNationalities.includes(nationality.toLowerCase())) {
    return res.status(400).json({ message: "Invalid nationality" });
  }

  if (!education) {
    return res.status(400).json({ message: "Education is required" });
  }

  const validEducations = [
    "10th",
    "12th",
    "diploma",
    "graduation",
    "post-graduation",
    "doctorate",
  ];

  if (!validEducations.includes(education.toLowerCase())) {
    return res.status(400).json({ message: "Invalid education" });
  }

  if (!occupation) {
    return res.status(400).json({ message: "Occupation is required" });
  }

  const validOccupations = [
    "student",
    "business",
    "job",
    "self-employed",
    "not-working",
  ];

  if (!validOccupations.includes(occupation.toLowerCase())) {
    return res.status(400).json({ message: "Invalid occupation" });
  }

  if (!income) {
    return res.status(400).json({ message: "Income is required" });
  }

  const validIncomes = [
    "0-2.5L",
    "2.5-5L",
    "5-7.5L",
    "7.5-10L",
    "10-15L",
    "15-20L",
    "20-30L",
    "30-50L",
    "50L+",
  ];

  if (!validIncomes.includes(income)) {
    return res.status(400).json({ message: "Invalid income" });
  }

  if (!city) {
    return res.status(400).json({ message: "City is required" });
  }

  const validCities = [
    "surat",
    "vadodara",
    "rajkot",
    "bhavnagar",
    "jamnagar",
  ];

  if (!validCities.includes(city)) {
    return res.status(400).json({ message: "Invalid city" });
  }

  if (!state) {
    return res.status(400).json({ message: "State is required" });
  }

  const validStates = [
    "gujarat",
    "punjab",
    "haryana",
    "delhi",
    "maharashtra",
    "karnataka",
    "tamil Nadu",
  ];

  if (!validStates.includes(state)) {
    return res.status(400).json({ message: "Invalid state" });
  }

  if (!country) {
    return res.status(400).json({ message: "Country is required" });
  }

  const validCountries = [
    "india",
    "united States",
    "united Kingdom",
    "australia",
    "canada",
  ];

  if (!validCountries.includes(country)) {
    return res.status(400).json({ message: "Invalid country" });
  }

  if (!height) {
    return res.status(400).json({ message: "Height is required" });
  }

  const validHeights = [
    "4'5",
    "4'6",
    "4'7",
    "4'8",
    "4'9",
    "4'10",
    "4'11",
    "5'0",
    "5'1",
    "5'2",
    "5'3",
    "5'4",
    "5'5",
    "5'6",
    "5'7",
    "5'8",
    "5'9",
    "5'10",
    "5'11",
    "6'0",
    "6'1",
    "6'2",
    "6'3",
    "6'4",
    "6'5",
    "6'6",
    "6'7",
    "6'8",
    "6'9",
    "6'10",
    "6'11",
    "7'0",
  ];

  if (!validHeights.includes(height)) {
    return res.status(400).json({ message: "Invalid height" });
  }

  if (!weight) {
    return res.status(400).json({ message: "Weight is required" });
  }

  const validWeights = [
    "40-45",
    "45-50",
    "50-55",
    "55-60",
    "60-65",
    "65-70",
    "70-75",
    "75-80",
    "80-85",
    "85-90",
    "90-95",
    "95-100",
    "100+",
  ];

  if (!validWeights.includes(weight)) {
    return res.status(400).json({ message: "Invalid weight" });
  }

  if (!hobbies) {
    return res.status(400).json({ message: "Hobbies are required" });
  }

  const validHobbies = [
    "reading",
    "writing",
    "painting",
    "singing",
    "dancing",
    "cooking",
    "travelling",
    "photography",
    "gardening",
  ];

  if (!validHobbies.includes(hobbies)) {
    return res.status(400).json({ message: "Invalid hobbies" });
  }

  if (!you_live_with_family) {
    return res.status(400).json({ message: "Living with family is required" });
  }

  const validLivingWithFamily = ["true", "false"];

  if (!validLivingWithFamily.includes(you_live_with_family)) {
    return res.status(400).json({ message: "Invalid living with family" });
  }

  if (!diet) {
    return res.status(400).json({ message: "Diet is required" });
  }

  const validDiets = [
    "vegetarian",
    "non-vegetarian",
    "eggetarian",
    "vegan",
  ];

  if (!validDiets.includes(diet)) {
    return res.status(400).json({ message: "Invalid diet" });
  }

  if (!profilePicture) {
    return res.status(400).json({ message: "Profile picture is required" });
  }

  const result = await profilePicUpload(profilePicture.path);
  if (!result || !result.secure_url) {
    throw new Error("Failed to upload profile picture");
  }
  const profilePic = result.secure_url;

  if (!profilePic) {
    return res
      .status(500)
      .json({ message: "Failed to upload profile picture" });
  }

  deleteLocalFile(profilePicture.path);

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    userName,
    email,
    password: hashedPassword,
    firstName,
    lastName,
    gender,
    age,
    bio,
    mobile_no,
    dob,
    religion,
    maritalStatus,
    motherTongue,
    nationality,
    education,
    occupation,
    income,
    city,
    state,
    country,
    height,
    weight,
    hobbies,
    you_live_with_family,
    diet,
    profilePic,
  });

  try {
    await user.save();
    generateToken(res, user, "User registered successfully");
  } catch (error) {
    console.log("Error occurred while registering user", error);
    res.status(409).json({ message: "User registration failed" });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail) {
      return res.status(400).json({ message: "Username or email is required" });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    let user;
    // if (username) {
    //   user = await User.findOne({ username });
    // } else {
    //   user = await User.findOne({ email });
    // }

    user = await User.findOne({
      $or: [{ userName: usernameOrEmail }, { email: usernameOrEmail }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    user.password = undefined;

    generateToken(res, user, "User logged in successfully");
  } catch (error) {
    console.log("Error occurred while logging in user", error);
    res.status(409).json({ message: "User login failed" });
  }
};

export const userLogout = async (req, res) => {
  try {
    deleteToken(res, "User logged out successfully");
  } catch (error) {
    console.log("Error occurred while logging out user", error);
    res.status(409).json({ message: "User logout failed" });
  }
};

export const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.id).select(
      "-password -__v -_id -createdAt -updatedAt"
    );
    res.json(user);
  } catch (error) {
    console.log("Error occurred while fetching user profile", error);
    res.status(409).json({ message: "User profile fetch failed" });
  }
};

export const uploadPhotos = async (req, res) => {
  try {
    const photos = req.files;
    const photoUrls = [];

    for (const photo of photos) {
      const result = await myphotosUpload(photo.path);
      if (!result || !result.secure_url) {
        throw new Error("Failed to upload photos");
      }
      photoUrls.push(result.secure_url);
      deleteLocalFile(photo.path);
    }

    // save the photoUrls in the database myphotos field
    const user = await User.findById(req.id);
    user.myPhotos.push(...photoUrls);
    await user.save();

    deleteLocalFile(photo.path);
    res.json({ photos: photoUrls });
  } catch (error) {
    console.log("Error occurred while uploading photos", error);
    res.status(409).json({ message: "Photos upload failed" });
  }
};

export const displayUserPhotos = async (req, res) => {
  try {
    const user = await User.findById(req.id).select("myPhotos");
    res.json(user);
  } catch (error) {
    console.log("Error occurred while displaying user photos", error);
    res.status(409).json({ message: "User photos display failed" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    let {
      firstName,
      lastName,
      bio,
      mobile_no,
      dob,
      religion,
      maritalStatus,
      motherTongue,
      nationality,
      education,
      occupation,
      income,
      city,
      state,
      country,
      height,
      weight,
      hobbies,
      you_live_with_family,
      diet,
    } = req.body;

    const profilePicture = req.file;

    const user = await User.findById(req.id);

    firstName = firstName || user.firstName;
    lastName = lastName || user.lastName;
    bio = bio || user.bio;

    if (mobile_no) {
      if (!/^[0-9]{10}$/.test(mobile_no)) {
        return res.status(400).json({ message: "Invalid mobile number" });
      }
      user.mobile_no = mobile_no;
    }

    if (dob) {
      const dobDate = new Date(dob);
      const currentDate = new Date();
      const ageDiff = currentDate - dobDate;
      const ageDate = new Date(ageDiff);
      const calculatedAge = Math.abs(ageDate.getUTCFullYear() - 1970);
      if (calculatedAge < 18) {
        return res
          .status(400)
          .json({ message: "User must be at least 18 years old" });
      }
      user.dob = dob;
      user.age = calculatedAge;
    }

    if (religion) {
      const validReligions = [
        "hindu",
        "muslim",
        "christian",
        "sikh",
        "jain",
        "buddhist",
        "other",
      ];
      if (!validReligions.includes(religion.toLowerCase())) {
        return res.status(400).json({
          message:
            "Religion must be either Hindu, Muslim, Christian, Sikh, Jain, Buddhist, or Other",
        });
      }
      user.religion = religion;
    }

    if (maritalStatus) {
      const validMaritalStatus = ["single", "married", "divorced", "widowed"];
      if (!validMaritalStatus.includes(maritalStatus.toLowerCase())) {
        return res.status(400).json({ message: "Invalid marital status" });
      }
      user.maritalStatus = maritalStatus;
    }

    if (motherTongue) {
      const validMotherTongues = [
        "hindi",
        "english",
        "punjabi",
        "bengali",
        "tamil",
        "telugu",
        "marathi",
        "urdu",
        "kannada",
        "gujarati",
        "odisha",
        "malayalam",
        "other",
      ];
      if (!validMotherTongues.includes(motherTongue.toLowerCase())) {
        return res.status(400).json({ message: "Invalid mother tongue" });
      }
      user.motherTongue = motherTongue;
    }

    if (nationality) {
      const validNationalities = [
        "indian",
        "american",
        "british",
        "australian",
        "canadian",
        "other",
      ];
      if (!validNationalities.includes(nationality.toLowerCase())) {
        return res.status(400).json({ message: "Invalid nationality" });
      }
      user.nationality = nationality;
    }

    if (education) {
      const validEducations = [
        "10th",
        "12th",
        "diploma",
        "graduation",
        "post-graduation",
        "doctorate",
        "other",
      ];
      if (!validEducations.includes(education.toLowerCase())) {
        return res.status(400).json({ message: "Invalid education" });
      }
      user.education = education;
    }

    if (occupation) {
      const validOccupations = [
        "student",
        "business",
        "job",
        "self-employed",
        "not-working",
        "other",
      ];
      if (!validOccupations.includes(occupation.toLowerCase())) {
        return res.status(400).json({ message: "Invalid occupation" });
      }
      user.occupation = occupation;
    }

    if (income) {
      const validIncomes = [
        "0-2.5L",
        "2.5-5L",
        "5-7.5L",
        "7.5-10L",
        "10-15L",
        "15-20L",
        "20-30L",
        "30-50L",
        "50L+",
      ];
      if (!validIncomes.includes(income)) {
        return res.status(400).json({ message: "Invalid income" });
      }
      user.income = income;
    }

    if (city) {
      const validCities = [
        "surat",
        "vadodara",
        "rajkot",
        "bhavnagar",
        "jamnagar",
        "other",
      ];
      if (!validCities.includes(city)) {
        return res.status(400).json({ message: "Invalid city" });
      }
      user.city = city;
    }

    if (state) {
      const validStates = [
        "gujarat",
        "punjab",
        "haryana",
        "delhi",
        "maharashtra",
        "karnataka",
        "tamil Nadu",
        "other",
      ];
      if (!validStates.includes(state)) {
        return res.status(400).json({ message: "Invalid state" });
      }
      user.state = state;
    }

    if (country) {
      const validCountries = [
        "india",
        "united States",
        "united Kingdom",
        "australia",
        "canada",
        "other",
      ];
      if (!validCountries.includes(country)) {
        return res.status(400).json({ message: "Invalid country" });
      }
      user.country = country;
    }

    if (height) {
      const validHeights = [
        "4'5",
        "4'6",
        "4'7",
        "4'8",
        "4'9",
        "4'10",
        "4'11",
        "5'0",
        "5'1",
        "5'2",
        "5'3",
        "5'4",
        "5'5",
        "5'6",
        "5'7",
        "5'8",
        "5'9",
        "5'10",
        "5'11",
        "6'0",
        "6'1",
        "6'2",
        "6'3",
        "6'4",
        "6'5",
        "6'6",
        "6'7",
        "6'8",
        "6'9",
        "6'10",
        "6'11",
        "7'0",
      ];
      if (!validHeights.includes(height)) {
        return res.status(400).json({ message: "Invalid height" });
      }
      user.height = height;
    }

    if (weight) {
      const validWeights = [
        "40-45",
        "45-50",
        "50-55",
        "55-60",
        "60-65",
        "65-70",
        "70-75",
        "75-80",
        "80-85",
        "85-90",
        "90-95",
        "95-100",
        "100+",
      ];
      if (!validWeights.includes(weight)) {
        return res.status(400).json({ message: "Invalid weight" });
      }
      user.weight = weight;
    }

    if (hobbies) {
      const validHobbies = [
        "reading",
        "writing",
        "painting",
        "singing",
        "dancing",
        "cooking",
        "travelling",
        "photography",
        "gardening",
        "other",
      ];
      if (!validHobbies.includes(hobbies)) {
        return res.status(400).json({ message: "Invalid hobbies" });
      }
      user.hobbies = hobbies;
    }

    if (you_live_with_family) {
      const validLivingWithFamily = ["true", "false"];
      if (!validLivingWithFamily.includes(you_live_with_family)) {
        return res.status(400).json({ message: "Invalid living with family" });
      }
      user.you_live_with_family = you_live_with_family;
    }

    if (diet) {
      const validDiets = [
        "vegetarian",
        "non-vegetarian",
        "eggetarian",
        "vegan",
        "other",
      ];
      if (!validDiets.includes(diet)) {
        return res.status(400).json({ message: "Invalid diet" });
      }
      user.diet = diet;
    }

    if (profilePicture) {
      const result = await profilePicUpload(profilePicture.path);
      if (!result || !result.secure_url) {
        throw new Error("Failed to upload profile picture");
      }
      user.profilePic = result.secure_url;
      deleteLocalFile(profilePicture.path);
    }

    await user.save();
    res.json({ message: "User profile updated successfully" });
  } catch (error) {
    console.log("Error occurred while updating user profile", error);
    res.status(409).json({ message: "User profile update failed" });
  }
};

export const userDelete = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.log("Error occurred while deleting user", error);
    res.status(409).json({ message: "User delete failed" });
  }
};

export const likeProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.id);
    const likedUser = await User.findById(id);
    if (!user || !likedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.liked.includes(likedUser._id)) {
      return res.status(400).json({ message: "Profile already liked" });
    }
    user.liked.push(likedUser._id);
    await user.save();
    res.json({ message: "Profile liked successfully" });
  } catch (error) {
    console.log("Error occurred while liking profile", error);
    res.status(409).json({ message: "Profile like failed" });
  }
};

export const unlikeProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.id);
    const likedUser = await User.findById(id);
    if (!user || !likedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.liked.includes(likedUser._id)) {
      user.liked.pull(likedUser._id);
      await user.save();
      return res.json({ message: "Profile unliked successfully" });
    }
    res.status(400).json({ message: "Profile not liked" });
  } catch (error) {
    console.log("Error occurred while unliking profile", error);
    res.status(409).json({ message: "Profile unlike failed" });
  }
};
const Constants = {
  USER_PROFILE_IMAGE_PERMITTED_EXT: ['png', 'jpg', 'jpeg', 'webp'],
  USER_FILTERS_SCHEMA: {
    role: {
      isObjectID: true,
      type: "string",
    },
    skills: {
      isObjectID: true,
      type: "array",
    },
    work_place: {
      isObjectID: true,
      type: "string",
    },
    work_experiences: {
      isObjectID: true,
      type: "array",
    },
    languages: {
      isObjectID: true,
      type: "array",
    },
  },
  USER_MIN_DATA_TO_PROFILE_COMPLETE: {
    profile_image: {
      type: "string",
    },
    birth_date: {
      type: "string",
    },
    sex: {
      type: "string",
    },
    phone_number: {
      type: "string",
    },
    city: {
      type: "string",
    },
    job_type: {
      type: "string",
    },
    role: {
      type: "string",
    },
    bio: {
      type: "string",
    },
    skills: {
      type: "array",
    },
    work_place: {
      type: "string",
    },
    work_experiences: {
      type: "array",
    },
    languages: {
      type: "array",
    },
  }
}

module.exports = {
  ...Constants,
}

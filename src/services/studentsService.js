const makeRequest = async (reqMethod, path, reqBody) => {
  const details = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: reqMethod,
  };
  if (reqBody) {
    details["body"] = JSON.stringify(reqBody);
  }
  const response = await fetch(path, details);
  return await response.json();
};

const baseUrl = "http://localhost:4000";
export const postNewStudent = (studentData) =>
  makeRequest("POST", `${baseUrl}/post/students`, studentData);

export const getStudentsByNationality = () =>
  makeRequest("GET", `${baseUrl}/get/students/by/nationality`);

export const getStudentsByNationalitySorted = (order) =>
  makeRequest(
    "GET",
    `${baseUrl}/get/students/by/nationality/sort?order=${order}`
  );

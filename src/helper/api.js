import axios from "axios";

// BaseUrl
export const BaseUrl = "https://ecommerce.routemisr.com";

// post function to post data and return data and errorMessage
export async function postData(endPoint, values, head, param) {
  let MainData = false;
  let mainErrorMessage = false;

  if (head) {
    await axios
      .post(`${BaseUrl}${endPoint}`, values, head)
      .then(({ data }) => {
        // if success
        MainData = data;
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message || error?.message;
        // if error
        mainErrorMessage = errorMessage;
      });
  } else {
    await axios
      .post(`${BaseUrl}${endPoint}`, values)
      .then(({ data }) => {
        // if success
        MainData = data;
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message || error?.message;
        // if error
        mainErrorMessage = errorMessage;
      });
  }

  return [MainData, mainErrorMessage];
}

// put function to put data and return data and errorMessage
export async function putData(endPoint, values, head) {
  let MainData = false;
  let mainErrorMessage = false;

  if (head) {
    await axios
      .put(`${BaseUrl}${endPoint}`, values, head)
      .then(({ data }) => {
        // if success
        MainData = data;
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message || error?.message;
        // if error
        mainErrorMessage = errorMessage;
      });
  } else {
    await axios
      .put(`${BaseUrl}${endPoint}`, values)
      .then(({ data }) => {
        // if success
        MainData = data;
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message || error?.message;
        // if error
        mainErrorMessage = errorMessage;
      });
  }

  return [MainData, mainErrorMessage];
}

// get function to return data and errorMessage
export async function getData(endPoint, head) {
  let MainData = false;
  let mainErrorMessage = false;

  if (head) {
    await axios
      .get(`${BaseUrl}${endPoint}`, head)
      .then(({ data }) => {
        // if success
        MainData = data;
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message || error?.message;
        // if error
        mainErrorMessage = errorMessage;
      });
  } else {
    await axios
      .get(`${BaseUrl}${endPoint}`)
      .then(({ data }) => {
        // if success
        MainData = data;
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message || error?.message;
        // if error
        mainErrorMessage = errorMessage;
      });
  }

  return [MainData, mainErrorMessage];
}

// delete function to delete data and return data and errorMessage
export async function deleteData(endPoint, head) {
  let MainData = false;
  let mainErrorMessage = false;

  await axios
    .delete(`${BaseUrl}${endPoint}`, head)
    .then(({ data }) => {
      // if success
      MainData = data;
    })
    .catch((error) => {
      const errorMessage = error?.response?.data?.message || error?.message;
      // if error
      mainErrorMessage = errorMessage;
    });

  return [MainData, mainErrorMessage];
}

import axios from "axios";

// BaseUrl
export const BaseUrl = "https://ecommerce.routemisr.com";

// post function to post data and return data and errorMessage
export async function postData(endPoint, values, head) {
  if (head) {
    return await axios
      .post(`${BaseUrl}${endPoint}`, values, head)
      .then(({ data }) => {
        return [data, false];
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message || error?.message;
        return [false, errorMessage];
      });
  } else {
    return await axios
      .post(`${BaseUrl}${endPoint}`, values)
      .then(({ data }) => {
        return [data, false];
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message || error?.message;
        return [false, errorMessage];
      });
  }
}

// put function to put data and return data and errorMessage
export async function putData(endPoint, values, head) {
  if (head) {
    return await axios
      .put(`${BaseUrl}${endPoint}`, values, head)
      .then(({ data }) => {
        return [data, false];
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message || error?.message;
        return [false, errorMessage];
      });
  } else {
    return await axios
      .put(`${BaseUrl}${endPoint}`, values)
      .then(({ data }) => {
        return [data, false];
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message || error?.message;
        return [false, errorMessage];
      });
  }
}

// get function to return data and errorMessage
export async function getData(endPoint, head) {
  if (head) {
    return await axios
      .get(`${BaseUrl}${endPoint}`, head)
      .then(({ data }) => {
        return [data, false];
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message || error?.message;
        return [false, errorMessage];
      });
  } else {
    return await axios
      .get(`${BaseUrl}${endPoint}`)
      .then(({ data }) => {
        return [data, false];
      })
      .catch((error) => {
        const errorMessage = error?.response?.data?.message || error?.message;
        return [false, errorMessage];
      });
  }
}

// delete function to delete data and return data and errorMessage
export async function deleteData(endPoint, head) {
  return await axios
    .delete(`${BaseUrl}${endPoint}`, head)
    .then(({ data }) => {
      return [data, false];
    })
    .catch((error) => {
      const errorMessage = error?.response?.data?.message || error?.message;
      return [false, errorMessage];
    });
}

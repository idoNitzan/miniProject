function parseJSON(response) {
  return new Promise((resolve, reject) =>
    response
      .json()
      .then(json =>
        resolve({
          status: response.status,
          ok: response.ok,
          json,
        }),
      )
      .catch(error => reject(response.status)),
  )
}

export const api = (uri, data) => {
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
  }
  options.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  options.credentials = 'include'

  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000' + uri, options)
      .then(parseJSON)
      .then(response => {
        if (response.ok) {
          resolve(response.json)
        } else {
          reject({
            errorMsg: response.json.error,
            status: response.status,
            errors: response.json.errors,
          })
        }
      })
      .catch(error => {
        reject({
          errorMsg: 'network',
          status: 0,
          errors: 'Network request failed',
        })
      })
  })
}
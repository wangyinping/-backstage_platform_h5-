function XHRPromise (json, vm) {
  const data = json.data || ''
  return new Promise((resolve, reject) => {
    let car = true
    vm().$root.Bus.$emit('openLoading');
    var timer = setTimeout(() => {
      reject({msg: '服务器请求超时！'})
      car = false
      vm().$root.Bus.$emit('closeLoading')
    }, 60000)

    var xhr = new XMLHttpRequest()
    var formData = data
    function judgeFile (data) {
      for (var key in data) {
        if (data[key] instanceof File) {
          return true
        }
      }
    }
    if (judgeFile(data)) {
      formData = new FormData()
      for (var key in data) {
        formData.append(key, data[key])
      }
    }

    function encodeFormData (data) {
      if (!data) return ''
      var pairs = []
      for (var name in data) {
        if (!data.hasOwnProperty(name)) continue
        if (typeof data[name] === 'function') continue
        var value = data[name].toString()
        name = encodeURIComponent(name.replace('%20', '+'))
        value = encodeURIComponent(value.replace('%20', '+'))
        pairs.push(name + '=' + value)
      }
      return pairs.join('&')
    }

    if (typeof formData === 'object' && !(formData instanceof FormData)) {
      formData = encodeFormData(formData)
    }

    if ((json.method === 'GET' && formData) || json.method === 'DELETE' || json.method === 'PUT') {
      json.url += `?${formData}`
    }
    xhr.addEventListener('error', data => {
      clearTimeout(timer)
      vm().$root.Bus.$emit('closeLoading')
      reject(data)
    })
    xhr.addEventListener('load', data => {
      clearTimeout(timer)
      vm().$root.Bus.$emit('closeLoading')
      if (car) resolve(data)
    })

    xhr.open(json.method, json.url)
    if (formData instanceof FormData) {
      // xhr.setRequestHeader("Content-Type","multipart/form-data");
    } else {
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    }
    xhr.setRequestHeader('Authorization', localStorage.getItem('Authorization'))
    xhr.send(formData)
  })
}

export default XHRPromise

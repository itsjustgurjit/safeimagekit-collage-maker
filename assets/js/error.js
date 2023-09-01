window.addEventListener('error', (error) => {
  console.log(error)
  console.log(error.message)
  console.log(error.type)
  console.log(error.lineno)
  console.log(error.error.stack)
  console.log(error.filename)
  Rollbar.critical(`
    Error Message:- ${error.message} 
    Error Type:- ${error.type}
    Error FileName:- ${error.filename}
    Error filename:- ${error.lineno}
    Error stack:- ${error.error.stack}
    Error location :- ${window.location.href}
    `)
})

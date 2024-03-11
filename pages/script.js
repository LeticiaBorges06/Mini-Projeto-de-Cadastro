// Campos do formulário de cadastro
const signUpForm = document.querySelector("#signUp");
const imgInput = document.querySelector("#imgInput");
const signupNameInput = document.querySelector("#signupName");
const signupEmailInput = document.querySelector("#signupEmail");
const signupAgeInput = document.querySelector("#signupAge");
const signupSalaryInput = document.querySelector("#signupSalary");
const signupTelephoneInput = document.querySelector("#signupTelephone");
const signupObserInput = document.querySelector("#signupObser");
const signupPasswordInput = document.querySelector("#signupPassword");
const signupConfirmPasswordInput = document.querySelector("#signupConfirmPassword");
const sexRadio = document.getElementsByName('sex');
const smokeRadio = document.getElementsByName('smoke');
const healthPlanRadio = document.getElementsByName('heathPlan');
const signUpBtn = document.querySelector("#signUpBtn");

// Campos do formulário de login
const loginForm = document.querySelector("#loginForm");
const loginEmailInput = document.querySelector("#loginEmail");
const loginPasswordInput = document.querySelector("#loginPassword");
const loginBtn = document.querySelector("#loginBtn");

// Outros
const allInputs = document.querySelector('input')
const img = document.querySelector("#img");
const notification = document.querySelector(".notificationContainer");

const addImg = () => {
  img.style.display = 'block'
  img.src = URL.createObjectURL(imgInput.files[0])
}

// Verfica se todos os campos do cadastro estão preenchidos e habilita e desabilita o botão 
const signupButtonDisable = () => {

  let sex
  let smoke
  let healthPlan

  sexRadio.forEach(element => {
    if (element.checked) {
      sex = element.value
    }
  })

  smokeRadio.forEach(element => {
    if (element.checked) {
      smoke = element.value
    }
  })

  healthPlanRadio.forEach(element => {
    if (element.checked) {
      healthPlan = element.value
    }
  })

  if (
    signupNameInput.value === "" ||
    signupEmailInput.value === "" ||
    signupAgeInput.value === "" ||
    signupSalaryInput.value === "" ||
    signupTelephoneInput.value === "" ||
    signupConfirmPasswordInput.value === "" ||
    signupPasswordInput.value === ""
    ||
    sex === undefined ||
    smoke === undefined ||
    healthPlan === undefined
  ) {
    signUpBtn.setAttribute("disabled", true);
  } else {
    signUpBtn.removeAttribute("disabled");
  }
};

// Verfica se todos os campos do login estão preenchidos e habilita e desabilita o botão
const loginButtonDisable = () => {
  if (loginEmail.value === "" || loginPasswordInput.value === "") {
    loginBtn.setAttribute("disabled", true);
  } else {
    loginBtn.removeAttribute("disabled");
  }
};

const telephoneMask = () => {
  signupTelephoneInput.value = signupTelephoneInput.value.replace(/\D/g, "");
  signupTelephoneInput.value = signupTelephoneInput.value.replace(/^(\d{2})(\d)(\d+)/, "($1) $2 $3");
  signupTelephoneInput.value = signupTelephoneInput.value.replace(/(\d{4})(\d)/, "$1-$2");
};

// Altera entre o formulario de cadastro e login
const changeForm = (direction) => {
  if (direction === "left") {
    loginForm.style.display = 'flex'
    loginForm.classList.remove("hideLogin");
    loginForm.classList.add("showLogin");

    document.body.style.overflowY = 'hidden'
    signUpForm.classList.remove("showSignUp");
    signUpForm.classList.add("hideSignUp");
    signUpForm.reset()
    signupButtonDisable()
    img.style.display = 'none'

  } else {
    loginForm.classList.remove("showLogin");
    loginForm.classList.add("hideLogin");
    loginForm.reset()
    loginButtonDisable()

    document.body.style.overflowY = 'visible'
    signUpForm.classList.remove("hideSignUp");
    signUpForm.classList.add("showSignUp");
  }
};

const messages = (message, status) => {
  notification.removeAttribute("error");
  notification.removeAttribute("success");

  if (status === "error") {
    notification.setAttribute("error", "");
  } else if (status === "success") {
    notification.setAttribute("success", "");
  }

  notification.style.display = "block";
  notification.innerHTML = message;

  setTimeout(() => {
    notification.style.display = "none";
  }, 3000);
};

// Faz a validação dos inputs
const formVerification = (user) => {
  let error = false
  let errorNumber = 0

  if (user.email.match(/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i)) {
    signupEmailInput.classList.remove('invalid')
  } else {
    errorNumber = 1
  }

  if (user.password != user.confirmPassword) {
    errorNumber = 2
  } else if (user.password.length < 6) {
    errorNumber = 3
  } else {
    signupConfirmPasswordInput.classList.remove("invalid");
    signupPasswordInput.classList.remove("invalid");
  }

  if (user.telephone.length < 16) {
    errorNumber = 4
  } else {
    signupTelephoneInput.classList.remove("invalid");
  }

  if (user.age >= 100 || user.age <= 0) {
    errorNumber = 5
  } else {
    signupAgeInput.classList.remove("invalid");
  }

  switch (errorNumber) {
    case 1:
      messages("Email Invalido", "error");
      signupEmailInput.classList.add("invalid");
      error = true
      break;

    case 2:
      messages("A senhas não estão iguais", "error");
      signupPasswordInput.classList.add("invalid");
      signupConfirmPasswordInput.classList.add("invalid");
      error = true
      break;

    case 3:
      messages("Sua senha deve possuir ao menos 6 caracteres", "error");
      signupPasswordInput.classList.add("invalid");
      error = true
      break;

    case 4:
      messages("Telefone inválido", "error");
      signupTelephoneInput.classList.add("invalid");
      error = true
      break;

    case 5:
      messages("Idade inválida", "error");
      signupAgeInput.classList.add("invalid");
      error = true
      break;

    default:
      error = false
      break;
  }

  return error
};

// Realiza o cadastro
signUpForm.addEventListener('submit', (e) => {
  e.preventDefault()

  let sex
  let smoke
  let healthPlan

  sexRadio.forEach(element => {
    if (element.checked) {
      sex = element.value
    }
  })

  smokeRadio.forEach(element => {
    if (element.checked) {
      smoke = element.value
    }
  })

  healthPlanRadio.forEach(element => {
    if (element.checked) {
      healthPlan = element.value
    }
  })

  // let img

  // Converte o arquivo da img para base64
  // Assim pode ser armazenado no localstorage
  // const toBase64 = new Promise((resolve, reject) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(imgInput.files[0]);
  //   reader.onload = () => resolve(reader.result)
  // });
  // img = await toBase64

  const user = {
    img: imgInput.files[0] || '', // Imagem
    email: signupEmailInput.value, // Email
    name: signupNameInput.value, // Nome
    age: signupAgeInput.value, // Idade
    telephone: signupTelephoneInput.value, // Telefone
    salary: signupSalaryInput.value, // Salário
    obs: signupObserInput.value || '', // Observação
    sex: sex, // Sexo
    smoke: smoke, // Fuma
    healthPlan: healthPlan, // Plano de saúde
    password: signupPasswordInput.value, // Senha 
    confirmPassword: signupConfirmPasswordInput.value, // Confirmar senha
  };

  if (formVerification(user) === false) {
    delete user.confirmPassword
    user.telephone = signupTelephoneInput.value.replace(/[^+\d]+/g, "");

    localStorage['user'] = JSON.stringify(user)
    messages('Usuário cadastrado com sucesso', 'success')
    changeForm('left')
  }
})

// Realiza o login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  if (localStorage['user'] === undefined) {
    messages('Você não possui Cadastro', 'error')
    changeForm('right')
  } else {
    const user = JSON.parse(localStorage['user'])

    const userLogin = {
      email: loginEmailInput.value,
      password: loginPasswordInput.value
    }

    if (userLogin.email === user.email && userLogin.password === user.password) {
      messages("Login correto", "success");
      loginForm.reset()
      loginButtonDisable()
      console.log(user); // Para Checar as informações do usuário
      window.location.href = "entrada.html";
    } else {
      messages("Usuário ou senha incorretos", "error");
    }
  }
})





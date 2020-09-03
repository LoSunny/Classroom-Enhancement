console.log("Loading Classroom Enhancement extension")

function loadAllA() {
  let as = document.getElementsByTagName('a');
  for (let i = 0; i < as.length; i++) {
    if (as[i].href.startsWith("https://drive.google.com/open") && as[i].dataset.domId == null && !as[i].classList.contains("classroomEnhancement")) {
      as[i].classList.add("classroomEnhancement");
      as[i].insertAdjacentHTML("afterend", `<span class="fastDownload" data-id="${as[i].href.match(/id=(.+)&/)[1]}" data-name="${as[i].querySelectorAll(".bKJwEd.VBEdtc-Wvd9Cc.zZN2Lb-Wvd9Cc")[0].textContent}"><i data-feather="download"></i></span>`)
    }
  }
  feather.replace()
  setTimeout(loadAllA, 5000);
}

loadAllA();

document.addEventListener("click", e => {
  let target = e.target.parentNode;
  if (target.classList.contains("fastDownload")) {
    download(target)
  } else if (target.parentNode.classList.contains("fastDownload")) {
    download(target.parentNode)
  }
});

function download(target) {
  let authUser;
  if (window.location.href.match(/\/([0-9])\//) == null)
    authUser = 0
  else
    authUser = window.location.href.match(/\/([0-9])\//)[1];
  chrome.runtime.sendMessage({
      greeting: "download",
      authuser: authUser,
      fileID: target.dataset.id,
      name: target.dataset.name
    },
    function() {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'File downloaded',
        showConfirmButton: false,
        timer: 1500
      })
    });
}

console.log("Loaded Classroom Enhancement extension")

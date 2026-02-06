const unlockDate = new Date("2025-02-07T00:01:00");
const birthdayPage = "birthday.html";

function checkUnlock() {
  if (new Date() >= unlockDate) {
    window.location.href = birthdayPage;
  }
}

// Check immediately
checkUnlock();

// Check every second (auto redirect)
setInterval(checkUnlock, 1000);


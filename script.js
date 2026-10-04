function login() {
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;
    if(user.trim() !== "" && pass.trim() !== "") {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('simulator-section').classList.remove('hidden');
    } else {
        alert("Authentication error: Enter valid operator credentials.");
    }
}

function logout() {
    document.getElementById('simulator-section').classList.add('hidden');
    document.getElementById('login-section').classList.remove('hidden');
}

function mod2div(dividend, divisor) {
    let datalen = dividend.length;
    let genlen = divisor.length;
    let temp = dividend.split('');

    for (let i = 0; i <= datalen - genlen; i++) {
        if (temp[i] === '1') {
            for (let j = 0; j < genlen; j++) {
                temp[i + j] = (temp[i + j] === divisor[j]) ? '0' : '1';
            }
        }
    }
    return temp.slice(datalen - genlen + 1).join('');
}

function generateFrame() {
    let data = document.getElementById('dataBits').value;
    let gen = document.getElementById('genPoly').value;
    
    if(!/^[01]+$/.test(data) || !/^[01]+$/.test(gen)) {
        alert("Invalid bit stream format. Use binary digits (0 and 1) only.");
        return;
    }

    let appended = data + '0'.repeat(gen.length - 1);
    let remainder = mod2div(appended, gen);
    let transmitted = data + remainder;

    document.getElementById('resRemainder').innerText = remainder;
    document.getElementById('resTransmitted').innerText = transmitted;
    document.getElementById('receivedFrame').value = transmitted;
    
    let alertBox = document.getElementById('statusBox');
    alertBox.classList.add('hidden');
    
    document.getElementById('checkRemainder').innerText = "-";
    document.getElementById('errorLog').innerText = "Frame compiled. Ready for physical layer simulation.";
}

function verifyFrame() {
    let received = document.getElementById('receivedFrame').value;
    let gen = document.getElementById('genPoly').value;

    if(!/^[01]+$/.test(received)) {
        alert("Received stream must be valid binary.");
        return;
    }

    let checkRem = mod2div(received, gen);
    document.getElementById('checkRemainder').innerText = checkRem;

    let alertBox = document.getElementById('statusBox');
    alertBox.classList.remove('hidden');
    let errorLog = document.getElementById('errorLog');

    if (checkRem.includes('1')) {
        alertBox.className = "alert-box alert-danger";
        alertBox.innerHTML = "🚨 CORRUPTION DETECTED: Non-zero remainder found. Packet dropped.";
        errorLog.innerHTML = "Error signature matched (" + checkRem + "). Noise injection verified.";
    } else {
        alertBox.className = "alert-box alert-success";
        alertBox.innerHTML = "✅ INTEGRITY VERIFIED: Remainder is 000. Packet accepted.";
        errorLog.innerHTML = "Zero remainder verified. Transmission secure.";
    }
}

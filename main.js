        var btnspinner = document.getElementById("buttonSpinner");
        var btntext = document.getElementById("buttonText");
        var submitBtn = document.getElementById("submitBtn");
        var messgaeText = document.getElementById("messgaeText");
        var centers = document.getElementById("centers");
        var alertbox = document.getElementById("alertbox");
        var alertbox2 = document.getElementById("alertbox2");
        var main = document.getElementById("main");
       
        document.getElementById('submitBtn').addEventListener('click',
            function start() {

                var windowLocation = window.location;
                var pin = document.getElementById("pincode").value
                var currentDate = new Date()
                var month = currentDate.getMonth() + 1
                const date = currentDate.getDate() + "-" + month + "-" + currentDate.getFullYear()
                btntext.textContent = "Loading";
                submitBtn.disabled = true;
                btnspinner.classList.remove("d-none");

                axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`)
                    .then(function (response) {
                        btntext.textContent = "Submit";
                        main.classList.remove("d-none");
                        alertbox.classList.add("d-none");
                        alertbox2.classList.add("d-none");
                        submitBtn.disabled = false;
                        btnspinner.classList.add("d-none");
                        var jsondata = response.data.sessions;
                        document.getElementById("centers").innerHTML = `
                        ${jsondata.map(createDatalist).join("")}
                            `
                            if (jsondata == ''){
                                console.log("nulllllllllllllllll");
                                alertbox2.classList.remove("d-none");

                            }
                    })
                    .catch(function (error) {
                        btntext.textContent = "Submit";
                        submitBtn.disabled = false;
                        btnspinner.classList.add("d-none");
                        alertbox.classList.remove("d-none");
                        main.classList.add("d-none");
                        // handle error
                        console.log(error);
                    })
                    .then(function () {
                        // always executed
                    });
            }

        )
        function createDatalist(center) {
           return `
<div class="card border-primary text-primary mb-3">
    <div class="card-header"><H4>${center.name}</H4></div>
     <div class="card-body text-dark">
      <p class="card-text"><b>Minimum Age limit:</b> ${center.min_age_limit}</p>
      <p class="card-text"><b>Capacity:</b> ${center.available_capacity}</p>
      <p class="card-text"><b>Vaccine Name:</b> <u>${center.vaccine}</u></p>
      <p class="card-text"><b>Address:</b> ${center.address}<br>
      <a class="btn btn-primary" href="https://www.google.com/maps/search/?api=1&query=${center.address}" target="_blank">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"></path>
  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"></path>
</svg> View on Google Map</a></p>
      <p class="card-text"><b>District:</b> ${center.district_name}</p>
      <p class="card-text"><b>Timmings:</b> ${center.from} to ${center.to}</p>
      <p class="card-text"><b>Available Slots:</b><br>
        ${center.slots[0]}<br>
        ${center.slots[1]}<br>
        ${center.slots[2]}<br>
        ${center.slots[3]}<br>
    </div>
</div>
`
}

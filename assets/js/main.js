AOS.init({
  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 900, // values from 0 to 3000, with step 50ms
  easing: "ease", // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: "top-bottom", // defines which position of the element regarding to window should trigger the animation
});

// ANGGOTA KELAS

document.addEventListener("DOMContentLoaded", function () {
  var classMembersContainer = document.getElementById(
    "class-members-container"
  );
  var pageSize = 6;
  var currentPage = 1;

  // Fetch member data from JSON file
  fetch("./assets/json/members.json")
    .then((response) => response.json())
    .then((members) => {
      function generateMemberHTML(member) {
        return `
              <div class="col-lg-4 col-sm-6" data-aos="fade-down" data-aos-delay="150">
                  <div class="class-members">
                      <div class="class-members-head p-4 bg-white theme-shadow">
                          <p>${member.description}</p>
                      </div>
                      <div class="class-members-person mt-4 d-flex align-items-center">
                          <img class="rounded-circle" src="${member.image}" alt="">
                          <div class="ms-3">
                              <h5>${member.name}</h5>
                              <small>${member.role}</small>
                          </div>
                      </div>
                  </div>
              </div>`;
      }

      function hideAllItems() {
        classMembersContainer.innerHTML = ""; // Clear existing content
      }

      function showPage(pageNumber) {
        hideAllItems();
        var startIndex = (pageNumber - 1) * pageSize;
        var endIndex = startIndex + pageSize;

        for (var i = startIndex; i < endIndex && i < members.length; i++) {
          var memberHTML = generateMemberHTML(members[i]);
          classMembersContainer.innerHTML += memberHTML;
        }
      }

      function updatePagination() {
        var pageCount = Math.ceil(members.length / pageSize);
        var paginationContainer = document.querySelector(".pagination");

        paginationContainer.innerHTML = ""; // Clear pagination before creating a new one

        // Add "Previous" button
        var previousItem = document.createElement("li");
        previousItem.className = "page-item";
        var previousLink = document.createElement("a");
        previousLink.className = "page-link";
        previousLink.href = "#";
        previousLink.textContent = "Previous";
        previousLink.addEventListener("click", function (event) {
          event.preventDefault();
          if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
            updatePagination();
          }
        });
        previousItem.appendChild(previousLink);
        paginationContainer.appendChild(previousItem);

        // Add page numbers
        for (var i = 1; i <= pageCount; i++) {
          var listItem = document.createElement("li");
          listItem.className = "page-item";
          var link = document.createElement("a");
          link.className = "page-link";
          link.href = "#";
          link.textContent = i;

          link.addEventListener("click", function (event) {
            event.preventDefault();
            var pageNumber = parseInt(event.target.textContent);
            currentPage = pageNumber;
            showPage(currentPage);
            updatePagination();
          });

          if (i === currentPage) {
            listItem.classList.add("active");
          }

          listItem.appendChild(link);
          paginationContainer.appendChild(listItem);
        }

        // Add "Next" button
        var nextItem = document.createElement("li");
        nextItem.className = "page-item";
        var nextLink = document.createElement("a");
        nextLink.className = "page-link";
        nextLink.href = "#";
        nextLink.textContent = "Next";
        nextLink.addEventListener("click", function (event) {
          event.preventDefault();
          if (currentPage < pageCount) {
            currentPage++;
            showPage(currentPage);
            updatePagination();
          }
        });
        nextItem.appendChild(nextLink);
        paginationContainer.appendChild(nextItem);

        // Enable or disable "Previous" and "Next" buttons based on the current page
        if (currentPage === 1) {
          previousItem.classList.add("disabled");
        } else {
          previousItem.classList.remove("disabled");
        }

        if (currentPage === pageCount) {
          nextItem.classList.add("disabled");
        } else {
          nextItem.classList.remove("disabled");
        }
      }

      showPage(currentPage);
      updatePagination();
    })
    .catch((error) => console.error("Error fetching members data:", error));
});

// JADWAL PELAJARAN
document.addEventListener("DOMContentLoaded", function () {
  var scheduleContainer = document.querySelector("#schedule .row");

  // Fetch schedule data from JSON file
  fetch("./assets/json/schedule.json")
    .then((response) => response.json())
    .then((schedule) => {
      schedule.forEach((day) => {
        var scheduleHTML = generateScheduleHTML(day);
        scheduleContainer.innerHTML += scheduleHTML;
      });
    })
    .catch((error) => console.error("Error fetching schedule data:", error));

  function generateScheduleHTML(day) {
    return `
            <div class="col-lg-4 col-md-6" data-aos="fade-down" data-aos-delay="150">
                <div class="schedule theme-shadow p-lg-5 p-4 d-flex align-items-center">
                    <div class="iconbox me-4">
                        <i class="ri-calendar-2-line"></i>
                    </div>
                    <div class="schedule-text">
                        <h5 class="mt-4 mb-3">${day.day}</h5>
                        <p>${day.lessons.join("<br>")}</p>
                    </div>
                </div>
            </div>`;
  }
});

// JADWAL PIKET
document.addEventListener("DOMContentLoaded", function () {
  var picketContainer = document.querySelector("#picket-container");

  // Fetch picket data from JSON file
  fetch("./assets/json/picket.json")
    .then((response) => response.json())
    .then((picket) => {
      picket.forEach((day) => {
        var picketHTML = generatePicketHTML(day);
        picketContainer.innerHTML += picketHTML;
      });
    })
    .catch((error) => console.error("Error fetching picket data:", error));

  function generatePicketHTML(day) {
    return `
          <div class="col-lg-4 col-sm-6 schedule" data-aos="fade-down" data-aos-delay="150">
              <div class="schedule theme-shadow p-lg-5 p-4">
                  <div class="iconbox">
                      <i class="ri-brush-2-line"></i>
                  </div>
                  <h5 class="mt-4 mb-3">${day.day}</h5>
                  <p>${day.members.join("<br>")}</p>
              </div>
          </div>`;
  }
});

// GALERI

var currentPage = 1; // Halaman awal
var itemsPerPage = 6; // Jumlah item per halaman
var galleryItems = []; // Array untuk menyimpan semua elemen galeri
var totalPages;

function loadGalleryItems() {
    var galleryRow = document.getElementById('dynamic-gallery-row');
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // Parse the JSON response
            var galleryData = JSON.parse(this.responseText);

            // Generate HTML for gallery items
            var galleryHTML = galleryData.map(function (item, index) {
                var delay = 150 + index * 100;
                return `
                    <div class="col-md-4" data-aos="fade-down" data-aos-delay="${delay}">
                        <div class="gallery-item image-zoom">
                            <div class="image-zoom-wrapper">
                                <img src="${item.src}" alt="${item.alt}">
                            </div>
                            <a href="${item.src}" data-fancybox="gallery" class="iconbox"><i class="ri-search-2-line"></i></a>
                        </div>
                    </div>`;
            }).join('');

            // Insert the generated HTML into the galleryRow
            galleryRow.innerHTML = galleryHTML;

            // Update galleryItems array
            galleryItems = document.querySelectorAll('.gallery-item');

            // Calculate total pages and show initial page
            totalPages = Math.ceil(galleryItems.length / itemsPerPage);
            showPage(currentPage);

            // Render pagination buttons
            renderPaginationButtons();
        }
    };

    // Fetch JSON data instead of HTML
    xhttp.open('GET', 'assets/json/gallery.json', true);
    xhttp.send();
};

function showPage(page) {
    // Menampilkan elemen galeri untuk halaman tertentu
    var startIndex = (page - 1) * itemsPerPage;
    var endIndex = Math.min(startIndex + itemsPerPage, galleryItems.length);

    for (var i = 0; i < galleryItems.length; i++) {
        if (i >= startIndex && i < endIndex) {
            galleryItems[i].style.display = 'block';
        } else {
            galleryItems[i].style.display = 'none';
        }
    }

    // Memastikan tinggi halaman tetap konstan
    updatePageHeight();
}

function renderPaginationButtons() {
    // Menampilkan tombol "Previous"
    document.getElementById('pagination-gallery').innerHTML = `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(event, ${currentPage - 1})">Previous</a>
        </li>
    `;

    // Menampilkan tombol untuk setiap halaman
    for (var i = 1; i <= totalPages; i++) {
        document.getElementById('pagination-gallery').innerHTML += `
            <li class="page-item ${currentPage === i ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(event, ${i})">${i}</a>
            </li>
        `;
    }

    // Menampilkan tombol "Next"
    document.getElementById('pagination-gallery').innerHTML += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(event, ${currentPage + 1})">Next</a>
        </li>
    `;
}

function changePage(event, page) {
    event.preventDefault(); // Mencegah perilaku default tag anchor
    currentPage = page;
    showPage(currentPage);
    renderPaginationButtons();
}

function updatePageHeight() {
    // Memastikan tinggi halaman tetap konstan
    var body = document.body;
    var html = document.documentElement;
    body.style.height = 'auto';
    html.style.height = 'auto';

    var maxHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
    body.style.height = maxHeight + 'px';
    html.style.height = maxHeight + 'px';
}

// Panggil fungsi untuk memuat galeri items saat halaman dimuat
window.onload = function () {
    loadGalleryItems();
    window.addEventListener('resize', updatePageHeight);
};


// PRESTASI

document.addEventListener("DOMContentLoaded", function () {
  // Ganti path/to/achievements.json dengan jalur yang benar ke file JSON prestasi
  fetch("./assets/json/achievements.json")
    .then((response) => response.json())
    .then((data) => {
      // Ambil elemen container prestasi
      const achievementContainer = document.getElementById(
        "achievement-container"
      );

      // Loop melalui data prestasi dan buat elemen HTML sesuai
      data.forEach((achievement) => {

        const achievementElement = document.createElement("div");
        achievementElement.className = "col-md-4";
        achievementElement.innerHTML = `
                  <div class="achievement image-zoom">
                      <div class="image-zoom-wrapper prestasi-container">
                          <img class="img-prestasi" src="${achievement.image}" alt="${achievement.title}">
                      </div>
                      <h5 class="mt-4">${achievement.title}</h5>
                      <p>${achievement.description}</p>
                      <a class="read-more" href="./maintenance.html">Read More</a>
                  </div>
              `;
        achievementContainer.appendChild(achievementElement);
      });
    })
    .catch((error) => console.error("Error fetching achievements:", error));
});

// PRESTASI SISWA

  document.addEventListener("DOMContentLoaded", function () {
    // Mendapatkan container untuk card-prestasi
    const prestasiContainer = document.getElementById("prestasiContainer");

    // Memuat data JSON
    fetch("./assets/json/achievements-member.json")
      .then(response => response.json())
      .then(data => {
        // Iterasi data dan buat card-prestasi
        data.forEach(prestasi => {
          // Membuat elemen card-prestasi
          const card = document.createElement("div");
          card.className = "col-lg-4 col-md-6 mb-4";
          card.innerHTML = `
            <div class="card-prestasi" data-aos="fade-down" data-aos-delay="150">
              <img decoding="async" src="${prestasi.image}" class="card__image" alt="">
              <div class="card__overlay">
                <div class="card__header">
                  <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                    <path />
                  </svg>
                  <img decoding="async" src="${prestasi.thumb}" alt="" class="card__thumb">
                  <div class="card__header-text">
                    <h3 class="card__title">${prestasi.title}</h3>
                    <span class="card__status">${prestasi.status}</span>
                  </div>
                </div>
                <p class="card__description">${prestasi.description}</p>
              </div>
            </div>
          `;

          // Menambahkan card-prestasi ke container
          prestasiContainer.appendChild(card);
        });
      })
      .catch(error => console.error("Error loading data:", error));
  });

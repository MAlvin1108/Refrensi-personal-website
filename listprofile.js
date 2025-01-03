document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const characterList = document.getElementById("character-list");
    const modal = document.createElement("div");
    modal.className = "modal";

    document.body.appendChild(modal);

    const categories = {
        protagonists: ["protagonist"],
        antagonists: ["antagonist"],
        supporting: ["supporting"],
    };

    //  untuk tombol pencarian
    searchButton.addEventListener("click", () => {
        const query = searchInput.value.toLowerCase();
        Array.from(characterList.children).forEach((li) => {
            const name = li.dataset.name.toLowerCase();
            li.style.display = name.includes(query) ? "block" : "none";
        });
    });

    // untuk sidebar kategori
    document.querySelectorAll(".sidebar li").forEach((category) => {
        category.addEventListener("click", () => {
            const type = category.id; // ID kategori (protagonists, antagonists, supporting)
            const allowedCategories = categories[type]; // kategori yang diperbolehkan
            Array.from(characterList.children).forEach((li) => {
                const charCategory = li.dataset.category; // kategori dari dataset
                li.style.display = allowedCategories.includes(charCategory) ? "block" : "none";
            });
        });
    });

    // untuk menampilkan detail karakter di modal
    characterList.addEventListener("click", (e) => {
        const li = e.target.closest("li");
        if (li) {
            modal.innerHTML = `
                <div class="modal-content">
                    <button class="close-button">&times;</button>
                    <h3>${li.dataset.name}</h3>
                    <p><strong>Date of Birth:</strong> ${li.dataset.dob}</p>
                    <p><strong>Age:</strong> ${li.dataset.age}</p>
                    <p><strong>Status:</strong> ${li.dataset.status === "hunter" ? "Hunter" : "Ex-Hunter"}</p>
                </div>
            `;
            modal.style.display = "flex";

            // Tombol untuk menutup modal
            modal.querySelector(".close-button").addEventListener("click", () => {
                modal.style.display = "none";
            });
        }
    });

    // Klik di luar modal untuk menutupnya
    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
});

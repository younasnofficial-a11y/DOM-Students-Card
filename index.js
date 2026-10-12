const students = [
    {
        name: "sohail",
        batch: "Batch #21",
        skills: ["HTML", "CSS", "JavaScript"]
    },
    {
        name: "younas",
        batch: "Batch #22",
        skills: ["HTML", "Bootstrap", "JavaScript"]
    },
    {
        name: "ali",
        batch: "Batch #20",
        skills: ["CSS", "UI/UX", "Figma"]
    },
    {
        name: "rahman",
        batch: "Batch #19",
        skills: ["JavaScript", "React", "Git"]
    }
];

const container = document.getElementById("students-container");
const skillFilter = document.getElementById("skill-filter");
const emptyMessage = document.getElementById("empty-message");

const allSkills = [...new Set(students.flatMap(function(student) {
    return student.skills;
}))].sort();

allSkills.forEach(function(skill) {
    const option = document.createElement("option");
    option.value = skill;
    option.textContent = skill;
    skillFilter.appendChild(option);
});

function renderStudents(selectedSkill) {
    const visibleStudents = students.filter(function(student) {
        return selectedSkill === "all" || student.skills.includes(selectedSkill);
    });

    container.innerHTML = visibleStudents.map(function(student) {
        const skills = student.skills.map(function(skill) {
            return `<span class="badge text-bg-primary">${skill}</span>`;
        }).join(" ");

        return `
            <div class="col-12 col-sm-6 col-md-3">
                <article class="card h-100 shadow-sm">
                    <img
                        src="graduate-student-3d-illustration_1147299-390.avif"
                        class="card-img-top p-3"
                        alt="Illustration of a graduate student"
                        style="height: 200px; object-fit: contain;">
                    <div class="card-body d-flex flex-column">
                        <h3 class="h5 card-title">${student.name}</h3>
                        <p class="card-text text-secondary">${student.batch}</p>
                        <button
                            class="btn btn-outline-dark btn-sm align-self-start mt-auto"
                            type="button"
                            data-skill-toggle
                            aria-expanded="false">
                            Show skills
                        </button>
                        <div class="d-none mt-3" data-skill-list>
                            <p class="small fw-semibold mb-2">Skills</p>
                            <div class="d-flex flex-wrap gap-2">${skills}</div>
                        </div>
                    </div>
                </article>
            </div>
        `;
    }).join("");

    emptyMessage.classList.toggle("d-none", visibleStudents.length > 0);
}

skillFilter.addEventListener("change", function(event) {
    renderStudents(event.target.value);
});

container.addEventListener("click", function(event) {
    const button = event.target.closest("[data-skill-toggle]");
    if (!button) {
        return;
    }

    const skillList = button.parentElement.querySelector("[data-skill-list]");
    const expanded = button.getAttribute("aria-expanded") === "true";

    button.setAttribute("aria-expanded", String(!expanded));
    button.textContent = expanded ? "Show skills" : "Hide skills";
    skillList.classList.toggle("d-none", expanded);
});

renderStudents("all");
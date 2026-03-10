interface Employee {
    empId: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    department: string;
    location: string;
    image: string;
    joiningDate: string;


}

const employees: Employee[] = [
    {
        empId: "INF122",
        firstName: "Robert",
        lastName: "Fox",
        role: "Customer Service Manager",
        email: "adamk@yahoo.com",
        department: "IT",
        location: "Hyderabad",
        image: "../../Assets/images/employee-image1.jpg",
        joiningDate: "",
        status: ""
    },
    {
        empId: "INF150",
        firstName: "Marvin",
        lastName: "McKinney",
        role: "Ux Designer",
        email: "s.ravani@yahoo.com",
        department: "Admin",
        location: "Hyderabad",
        image: "../../Assets/images/employee-image2.jpg",
        joiningDate: "",
        status: ""
    },
    {
        empId: "INF240",
        firstName: "Eleanor",
        lastName: "Pena",
        role: "Asistant Backend Developer",
        email: "grolschie@mac.com",
        department: "UIUX",
        location: "Hyderabad",
        image: "../../Assets/images/employee-image3.jpg",
        joiningDate: "",
        status: ""
    },
    {
        empId: "INF240",
        firstName: "Eleanor",
        lastName: "Pena",
        role: "Human Resource Manager",
        email: "grolschie@mac.com",
        department: "IT",
        location: "Hyderabad",
        image: "../../Assets/images/employee-image3.jpg",
        joiningDate: "",
        status: ""
    },
    {
        empId: "INF240",
        firstName: "Eleanor",
        lastName: "Pena",
        role: "Front End Developer",
        email: "grolschie@mac.com",
        department: "Product Engg.",
        location: "Hyderabad",
        image: "../../Assets/images/employee-image3.jpg",
        joiningDate: "",
        status: ""
    },
    {
        empId: "INF240",
        firstName: "Eleanor",
        lastName: "Pena",
        role: "Senior Developer",
        email: "grolschie@mac.com",
        department: "UIUX",
        location: "Hyderabad",
        image: "../../Assets/images/employee-image3.jpg",
        joiningDate: "",
        status: ""
    }

];

document.addEventListener("DOMContentLoaded", () => {
    renderEmployees(employees);
});

function renderEmployees(data: Employee[]) {

    const container = document.getElementById("employeeCards") as HTMLElement;

    if (!container) return;

    container.innerHTML = "";

    data.forEach(emp => {

        const card = document.createElement("div");
        card.className = "role-card";

        card.innerHTML = `
        <div class="card-header">
            <h3>${emp.role}</h3>
            <button class="edit-btn">
                <img src="../../Assets/images/edit.svg">
            </button>
        </div>

        <div class="card-body">

            <div class="card-info">
                <img src="../../Assets/images/team_svgrepo.com.svg" class="info-icon">
                <span class="info-label">Department</span>
                <span class="info-value">${emp.department}</span>
            </div>

            <div class="card-info">
                <img src="../../Assets/images/location-pin-alt-1_svgrepo.com.svg" class="info-icon">
                <span class="info-label">Location</span>
                <span class="info-value">${emp.location}</span>
            </div>

            <div class="card-info">
                <span class="info-label">Total Employees
                </span>
                 <div class="employee-avatars">
                                <img src="../../Assets/images/employee-image1.jpg" class="emp-avatar">
                                <img src="../../Assets/images/employee-image2.jpg" class="emp-avatar">
                                <img src="../../Assets/images/employee-image3.jpg" class="emp-avatar">
                                <img src="../../Assets/images/employee-image2.jpg" class="emp-avatar">
                                <span class="more-count">+43</span>
                 </div>
            </div>

        </div>

        <div class="card-footer">
            <a href="../roleDetails/roleDetails.html" class="view-link">
                View all Employees <img src="../../Assets/images/Vector.svg">
            </a>
        </div>
        `;

        container.appendChild(card);
    });

}


//minimize and miximize sidebar
function sidebar(): void {
    const sidebar = document.querySelector<HTMLElement>(".sidebar");
    const main = document.querySelector<HTMLElement>(".main");
    const spans = sidebar?.querySelectorAll<HTMLSpanElement>(".menu span");
    const titles = sidebar?.querySelectorAll<HTMLElement>(".sidebar-title");
    const updateBox = sidebar?.querySelector<HTMLElement>(".update-box");
    const chevrons = sidebar?.querySelectorAll<HTMLElement>(".menu i");
    const listItems = sidebar?.querySelectorAll<HTMLElement>(".menu li");
    const tezoText = document.querySelector<HTMLSpanElement>(".logo-box span");
    const tezoLogo = document.querySelector<HTMLImageElement>(".logo-box img");
    const logoBox = document.querySelector<HTMLElement>(".logo-box");
    const handlePic = document.querySelector<HTMLImageElement>(".handle-pic");

    sidebar?.classList.toggle("collapsed");

    if (sidebar?.classList.contains("collapsed")) {
        sidebar.style.width = "70px";
        if (main) main.style.marginLeft = "80px";

        spans?.forEach(el => (el.style.display = "none"));
        titles?.forEach(el => (el.style.display = "none"));
        chevrons?.forEach(el => (el.style.display = "none"));

        if (updateBox) updateBox.style.display = "none";
        if (tezoText) tezoText.style.display = "none";

        if (tezoLogo) {
            tezoLogo.style.width = "40px";
            tezoLogo.style.maxWidth = "none";
            tezoLogo.style.marginLeft = "10px";
        }
        if (logoBox) {
            logoBox.style.width = "40px";
            logoBox.style.overflow = "hidden";
        }

        handlePic?.classList.add("rotate");

        listItems?.forEach(li => {
            li.style.padding = "20px";
            li.style.marginTop = "10px";
            li.style.justifyContent = "center";
        });

    } else {
        if (sidebar) sidebar.style.width = "240px";
        if (main) main.style.marginLeft = "250px";

        spans?.forEach(el => (el.style.display = ""));
        titles?.forEach(el => (el.style.display = ""));
        chevrons?.forEach(el => (el.style.display = ""));

        if (updateBox) updateBox.style.display = "";
        if (tezoText) tezoText.style.display = "";

        if (tezoLogo) {
            tezoLogo.style.width = "110px";
            tezoLogo.style.maxWidth = "";
            tezoLogo.style.marginLeft = "";
        }
        if (logoBox) {
            logoBox.style.width = "250px";
            logoBox.style.overflow = "";
        }

        if (handlePic) {
            handlePic.style.left = "-36px";
            handlePic.classList.remove("rotate");
        }

        listItems?.forEach(li => {
            li.style.padding = "";
            li.style.marginTop = "";
            li.style.justifyContent = "";
        });
    }
}

document.querySelector<HTMLImageElement>(".handle-pic")
    ?.addEventListener("click", sidebar);

//profileNameadddynamically
function profileDynamically() {
    const employees = JSON.parse(localStorage.getItem('employees')) || [];
    const profileName = document.querySelector<HTMLSpanElement>(".profile-info .profile-name");
    const profileRole = document.querySelector<HTMLSpanElement>(".profile-info .profile-role");

    const adminUser = employees.find(emp =>
        emp.role && emp.role.toLowerCase() === "admin"
    );
    if (adminUser) {
        profileName.textContent =
            (adminUser.firstName || "") + " " +
            (adminUser.lastName || "");

        profileRole.textContent =
            adminUser.role || "";

    }
    else {
        profileName.textContent = "";
        profileRole.textContent = "";
    }
}
document.addEventListener("DOMContentLoaded", profileDynamically);
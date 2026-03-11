interface Employee {
    empId: string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    department: string;
    location: string;
    image: string;
}

const emp: Employee[] = [
{
    empId: "INF122",
    firstName: "Robert",
    lastName: "Fox",
    role: "Head of Product Design",
    email: "adamk@yahoo.com",
    department: "Technology",
    location: "Stockton, New Hampshire",
    image: "../../Assets/images/employee-image1.jpg",
    joiningDate:"",
    status:""
},
{
    empId: "INF150",
    firstName: "Marvin",
    lastName: "McKinney",
    role: "Head of Engineering",
    email: "s.ravani@yahoo.com",
    department: "Admin",
    location: "Syracuse, Connecticut",
    image: "../../Assets/images/employee-image2.jpg",
    joiningDate:"",
    status:""
},
{
    empId: "INF240",
    firstName: "Eleanor",
    lastName: "Pena",
    role: "Senior Interaction Designer",
    email: "grolschie@mac.com",
    department: "Customer Executive",
    location: "Portland, Illinois",
    image: "../../Assets/images/employee-image3.jpg",
    joiningDate:"",
    status:""
},
{
    empId: "INF389",
    firstName: "Jane",
    lastName: "Cooper",
    role: "Product Analyst",
    email: "chronos@aol.com",
    department: "Product",
    location: "Coppell, Virginia",
    image: "../../Assets/images/employee-image1.jpg",
    joiningDate:"",
    status:""
},
{
    empId: "INF209",
    firstName: "Floyd",
    lastName: "Miles",
    role: "Visual Designer",
    email: "dgatwood@msn.com",
    department: "Customer Executive",
    location: "Lansing, Illinois",
    image: "../../Assets/images/employee-image2.jpg",
    joiningDate:"",
    status:""
},
{
    empId: "INF922",
    firstName: "Dianne",
    lastName: "Russell",
    role: "Full Stack Software Engineer",
    email: "kspitler@live.com",
    department: "Human Research",
    location: "Corona, Michigan",
    image: "../../Assets/images/employee-image3.jpg",
    joiningDate:"",
    status:""
}
];

document.addEventListener("DOMContentLoaded", () => {
    renderEmployeesData(emp);
});

function renderEmployeesData(data: Employee[]) {

    const container = document.getElementById("employeeCards") as HTMLElement;

    if (!container) return;

    container.innerHTML = "";

    data.forEach(emp => {

        const card = document.createElement("div");
        card.className = "employee-card";

        card.innerHTML = `
        <div class="card-header">
            <img src="${emp.image}" class="employee-avatar">
            <div class="employee-info">
                <h4>${emp.firstName} ${emp.lastName}</h4>
                <p class="job-title">${emp.role}</p>
            </div>
        </div>

        <div class="card-body">

            <div class="detail-row">
                <img src="../../Assets/images/Vector (1).svg" class="detail-icon">
                <span class="detail-value">${emp.empId}</span>
            </div>

            <div class="detail-row">
                <img src="../../Assets/images/email-1_svgrepo.com.svg" class="detail-icon">
                <span class="detail-value">${emp.email}</span>
            </div>

            <div class="detail-row">
                <img src="../../Assets/images/team_svgrepo.com.svg" class="detail-icon">
                <span class="detail-value">${emp.department}</span>
            </div>

            <div class="detail-row">
                <img src="../../Assets/images/location-pin-alt-1_svgrepo.com.svg" class="detail-icon">
                <span class="detail-value">${emp.location}</span>
            </div>

        </div>

        <div class="card-footer">
            <a href="#" class="view-link">
                View <img src="../../Assets/images/Vector.svg">
            </a>
        </div>
        `;

        container.appendChild(card);
    });
}

//minimize and miximize sidebar
function sidebarminmax(): void {
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
    ?.addEventListener("click", sidebarminmax);


//profileNameadddynamically
function profileSectionDynamically() {
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
document.addEventListener("DOMContentLoaded", profileSectionDynamically);
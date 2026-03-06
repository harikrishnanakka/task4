//AddingEMployeeData
interface Employee {
    empId: string;
    firstName: string;
    lastName: string;
    email: string;
    joiningDate: string;
    location: string;
    department: string;
    role: string;
    status: string;
}

function addEmployeeInit(): void {
    const form = document.getElementById("addEmployeeForm") as HTMLFormElement | null;

    if (!form) return;

    form.addEventListener("submit", (e: Event) => {
        e.preventDefault();

        const params = new URLSearchParams(window.location.search);
        const mode = params.get("mode");

        if (mode === "edit" || mode === "view") {
            return;
        }

        const empId = (document.getElementById("empId") as HTMLInputElement | null)?.value.trim() || "";
        const firstName = (document.getElementById("firstName") as HTMLInputElement | null)?.value.trim() || "";
        const lastName = (document.getElementById("lastName") as HTMLInputElement | null)?.value.trim() || "";
        const email = (document.getElementById("email") as HTMLInputElement | null)?.value.trim() || "";
        const joiningDate = (document.getElementById("joiningDate") as HTMLInputElement | null)?.value.trim() || "";
        const location = (document.getElementById("location") as HTMLInputElement | null)?.value.trim() || "";
        const department = (document.getElementById("department") as HTMLInputElement | null)?.value.trim() || "";
        const role = (document.getElementById("role") as HTMLInputElement | null)?.value.trim() || "";
        const status = (document.getElementById("status") as HTMLInputElement | null)?.value.trim() || "";

        if (!empId || !firstName || !lastName || !email || !joiningDate) {
            alert("Please fill all required fields");
            return;
        }

        const storedData = localStorage.getItem("employees");
        let employees: Employee[] = storedData ? JSON.parse(storedData) : [];

        const newEmployee: Employee = {
            empId,
            firstName,
            lastName,
            email,
            joiningDate,
            location,
            department,
            role,
            status,
        };

        employees.push(newEmployee);

        localStorage.setItem("employees", JSON.stringify(employees));

        form.reset();

        const msg = document.getElementById("successMessage") as HTMLElement | null;

        if (msg) {
            msg.style.display = "flex";

            setTimeout(() => {
                msg.style.display = "none";
            }, 3000);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    addEmployeeInit();
});


//viewEditModeEmployees
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get("mode");
    const empId = params.get("empId");

    if (mode && empId) {
        loadEmployeeData(mode, empId);
    }

});

//________LOAD EMPLOYEE FOR VIEW/EDIT

function loadEmployeeData(mode: string, empId: string) {
    const employees = JSON.parse(localStorage.getItem("employees")) || [];
    const emp = employees.find(e => e.empId === empId);

    if (!emp) {
        alert("Employee not found!");
        history.back();
        return;
    }
    populateForm(emp);
    updatePageHeader(mode);

    if (mode === "view") {
        initViewMode();
    } else if (mode === "edit") {
        initEditMode(empId);
    }

}


// ─── Populate Form Fields ───────────────────────────

function populateForm(emp: Employee): void {
    (document.getElementById("empId") as HTMLInputElement).value = emp.empId || "";
    (document.getElementById("firstName") as HTMLInputElement).value = emp.firstName || "";
    (document.getElementById("lastName") as HTMLInputElement).value = emp.lastName || "";
    (document.getElementById("email") as HTMLInputElement).value = emp.email || "";
    (document.getElementById("joiningDate") as HTMLInputElement).value = emp.joiningDate || "";
    (document.getElementById("role") as HTMLSelectElement).value = emp.role || "";
    (document.getElementById("location") as HTMLInputElement).value = emp.location || "";
    (document.getElementById("department") as HTMLSelectElement).value = emp.department || "";
    (document.getElementById("status") as HTMLSelectElement).value = emp.status || "";
}

// ─── Update Page Header ─────────────────────────────

function updatePageHeader(mode: string): void {
    const headings: Record<string, { title: string; subtitle: string }> = {
        view: { title: "View Employee", subtitle: "Employee details (read-only)." },
        edit: { title: "Edit Employee", subtitle: "Update employee details." },
    };

    const { title, subtitle } = headings[mode] || {};

    if (title) (document.querySelector(".page-header h2") as HTMLElement).textContent = title;
    if (subtitle) (document.querySelector(".page-header p") as HTMLElement).textContent = subtitle;
}

// ─── View Mode ──────────────────────────────────────

function initViewMode(): void {
    document
        .querySelectorAll<HTMLInputElement | HTMLSelectElement>("#addEmployeeForm input, #addEmployeeForm select")
        .forEach(el => {
            el.setAttribute("disabled", "true");
            el.style.backgroundColor = "#f5f5f5";
            el.style.color = "#888";
            el.style.cursor = "not-allowed";
            el.style.border = "1px solid #e0e0e0";
        });

    const form = document.querySelector("#addEmployeeForm") as HTMLFormElement;

    const banner = document.createElement("div");
    banner.style.cssText = `
        background: #fff8e1;
        border: 1px solid #ffe082;
        border-left: 4px solid #ffc107;
        color: #7d6200;
        padding: 10px 16px;
        border-radius: 6px;
        margin-bottom: 16px;
        font-size: 13px;
        display: flex;
        align-items: center;
        gap: 8px;
    `;

    banner.innerHTML = `<i class="bi bi-eye" style="font-size:16px;color:#ffc107;"></i> 
        <strong>View Only</strong> — This form is in read-only mode. You cannot make changes.`;

    form.prepend(banner);

    form.style.position = "relative";
    form.style.opacity = "0.92";

    const pageHeader = document.querySelector(".page-header h2") as HTMLElement | null;

    if (pageHeader) {
        const badge = document.createElement("span");
        badge.textContent = "VIEW ONLY";
        badge.style.cssText = `
            background: #fff3cd;
            color: #856404;
            border: 1px solid #ffc107;
            font-size: 11px;
            font-weight: 600;
            padding: 3px 8px;
            border-radius: 4px;
            margin-left: 10px;
            vertical-align: middle;
            letter-spacing: 0.5px;
        `;
        pageHeader.appendChild(badge);
    }

    (document.querySelector(".form-actions .btn-primary") as HTMLButtonElement).style.display = "none";

    const backBtn = document.querySelector(".form-actions .btn-light") as HTMLButtonElement;
    backBtn.textContent = "← Back";
    backBtn.style.backgroundColor = "#f0f0f0";
    backBtn.style.color = "#555";
    backBtn.style.border = "1px solid #ccc";
    backBtn.addEventListener("click", () => history.back());
}


// ─── Edit Mode ──────────────────────────────────────

function initEditMode(empId: string): void {
    (document.getElementById("empId") as HTMLInputElement).setAttribute("disabled", "true");

    const form = document.querySelector("#addEmployeeForm") as HTMLFormElement;

    const banner = document.createElement("div");
    banner.style.cssText = `
        background: #e8f4fd;
        border: 1px solid #90caf9;
        border-left: 4px solid #1976d2;
        color: #0d47a1;
        padding: 10px 16px;
        border-radius: 6px;
        margin-bottom: 16px;
        font-size: 13px;
        display: flex;
        align-items: center;
        gap: 8px;
    `;

    banner.innerHTML = `<i class="bi bi-pencil-square" style="font-size:16px;color:#1976d2;"></i> 
        <strong>Edit Mode</strong> — You are editing this employee's details. Save changes when done.`;

    form.prepend(banner);

    document
        .querySelectorAll<HTMLInputElement | HTMLSelectElement>("#addEmployeeForm input, #addEmployeeForm select")
        .forEach(el => {
            if (!el.hasAttribute("disabled")) {
                el.style.border = "1px solid #90caf9";
                el.style.backgroundColor = "#f0f7ff";
                el.style.transition = "border 0.2s ease";

                el.addEventListener("focus", () => {
                    el.style.border = "1.5px solid #1976d2";
                    el.style.backgroundColor = "#fff";
                    el.style.boxShadow = "0 0 0 3px rgba(25,118,210,0.15)";
                });

                el.addEventListener("blur", () => {
                    el.style.border = "1px solid #90caf9";
                    el.style.backgroundColor = "#f0f7ff";
                    el.style.boxShadow = "none";
                });
            }
        });

    const pageHeader = document.querySelector(".page-header h2");
    if (pageHeader) {
        const badge = document.createElement("span");
        badge.textContent = "EDIT MODE";
        badge.style.cssText = `
            background: #e3f2fd;
            color: #1565c0;
            border: 1px solid #90caf9;
            font-size: 11px;
            font-weight: 600;
            padding: 3px 8px;
            border-radius: 4px;
            margin-left: 10px;
            vertical-align: middle;
            letter-spacing: 0.5px;
        `;
        pageHeader.appendChild(badge);
    }

    const saveBtn = document.querySelector<HTMLButtonElement>(".form-actions .btn-primary");
    saveBtn.textContent = "Save Changes";
    saveBtn.style.backgroundColor = "#1976d2";
    saveBtn.style.boxShadow = "0 2px 6px rgba(25,118,210,0.4)";

    const cancelBtn = document.querySelector<HTMLButtonElement>(".form-actions .btn-light");
    cancelBtn.textContent = "X Cancel";
    cancelBtn.style.backgroundColor = "#f5f5f5";
    cancelBtn.style.color = "#555";
    cancelBtn.style.border = "1px solid #ccc";
    cancelBtn.addEventListener("click", () => history.back());

    let submitted = false;
    document.getElementById("addEmployeeForm").addEventListener("submit", function (e) {
        e.preventDefault();
        if (submitted) return;
        submitted = true;
        saveEditedEmployee(empId);
    });


}

function saveEditedEmployee(empId: string): void {
    let employees: Employee[] =
        JSON.parse(localStorage.getItem("employees") || "[]");

    const index = employees.findIndex(e => e.empId === empId);

    if (index === -1) {
        alert("Employee not found to update!");
        return;
    }

    const existing = employees[index];

    employees[index] = {
        empId,
        firstName: (document.getElementById("firstName") as HTMLInputElement).value.trim() || existing.firstName,
        lastName: (document.getElementById("lastName") as HTMLInputElement).value.trim() || existing.lastName,
        email: (document.getElementById("email") as HTMLInputElement).value.trim() || existing.email,
        joiningDate: (document.getElementById("joiningDate") as HTMLInputElement).value || existing.joiningDate,
        location: (document.getElementById("location") as HTMLInputElement).value.trim() || existing.location,
        department: (document.getElementById("department") as HTMLSelectElement).value.trim() || existing.department,
        role: (document.getElementById("role") as HTMLSelectElement).value.trim() || existing.role,
        status: (document.getElementById("status") as HTMLSelectElement).value.trim() || existing.status,
    };

    localStorage.setItem("employees", JSON.stringify(employees));

    const msg = document.getElementById("successMessage") as HTMLElement;
    msg.style.display = "flex";

    setTimeout(() => {
        msg.style.display = "none";
        history.back();
    }, 1500);
}

// ─── Profile Load ───────────────────────────────────

function profileLoad(): void {
    const employees: Employee[] =
        JSON.parse(localStorage.getItem("employees") || "[]");

    const profileName = document.querySelector(".profile-info .profile-name") as HTMLElement;
    const profileRole = document.querySelector(".profile-info .profile-role") as HTMLElement;

    const adminUser = employees.find(emp =>
        emp.role && emp.role.toLowerCase() === "admin"
    );

    if (adminUser) {
        profileName.textContent = `${adminUser.firstName || ""} ${adminUser.lastName || ""}`;
        profileRole.textContent = adminUser.role || "";
    } else {
        profileName.textContent = "";
        profileRole.textContent = "";
    }
}

document.addEventListener("DOMContentLoaded", function (): void {
    profileLoad();
});

function minimize(): void {
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


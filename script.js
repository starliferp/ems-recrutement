// script.js

let currentPage = 0;
const pages = document.querySelectorAll('.form-page');

// Fonction pour afficher une page spécifique
function showPage(pageIndex) {
    pages.forEach((page, index) => {
        page.style.display = index === pageIndex ? 'block' : 'none';
    });
}

// Affiche la première page lors du chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    showPage(currentPage);
});

// Fonction pour passer à la page suivante
function nextPage() {
    if (currentPage < pages.length - 1) {
        currentPage++;
        showPage(currentPage);
    }
}

// Fonction pour passer à la page précédente
function prevPage() {
    if (currentPage < pages.length - 1) {
        currentPage--;
        showPage(currentPage);
    }
}

// Fonction pour soumettre le formulaire
function submitForm() {
    // Vérifie si la case d'acceptation des règles est cochée
    if (!document.getElementById('acceptRules').checked) {
        alert('Vous devez accepter le règlement EMS pour continuer.');
        return;
    }

    // Vérifie si le formulaire est valide
    if (document.getElementById('recruitmentForm').checkValidity()) {
        generatePDF();  // Génère le PDF
    } else {
        alert('Veuillez remplir tous les champs obligatoires.');
    }
}

// Fonction pour générer le PDF avec jsPDF
function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    doc.setFontSize(18);
    doc.setTextColor(0, 86, 179);
    doc.text('Curriculum Vitae', 105, 20, null, null, 'center');

    let yOffset = 30;

    const sections = [
        { title: 'Informations Personnelles', content: getPersonalInfo() },
        { title: 'Lettre de Motivation', content: document.getElementById('motivationLetter').value },
        { title: 'Disponibilités', content: getAvailability() },
        { title: 'Qualités & Défauts', content: getQualitiesAndDefects() },
        { title: 'Choses à Rajouter', content: document.getElementById('additionalInfo').value }
    ];

    sections.forEach(section => {
        if (yOffset > 270) {
            doc.addPage();
            yOffset = 20;
        }
        doc.setFontSize(14);
        doc.setTextColor(0, 86, 179);
        doc.text(section.title, 20, yOffset);
        yOffset += 8;

        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.setFont("courier", "normal");
        const splitText = doc.splitTextToSize(section.content, 170);
        doc.text(splitText, 20, yOffset);
        yOffset += splitText.length * 6 + 10;
    });

    doc.save(`cv_${document.getElementById('rpNom').value.toLowerCase()}_${document.getElementById('rpPrenom').value.toLowerCase()}.pdf`);
}

// Fonction pour récupérer les informations personnelles
function getPersonalInfo() {
    return `HRP:\nPrénom: ${document.getElementById('hrpPrenom').value}\nÂge: ${document.getElementById('hrpAge').value}\n\nRP:\nNom: ${document.getElementById('rpNom').value}\nPrénom: ${document.getElementById('rpPrenom').value}\nÂge: ${document.getElementById('rpAge').value}`;
}

// Fonction pour récupérer les disponibilités
function getAvailability() {
    const jours = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    let disponibilites = "Disponibilités :\n";

    jours.forEach(jour => {
        const debut = document.getElementById(`${jour.toLowerCase()}Debut`).value;
        const fin = document.getElementById(`${jour.toLowerCase()}Fin`).value;
        disponibilites += `${jour} : ${debut} - ${fin}\n`;
    });

    return disponibilites;
}

// Fonction pour récupérer les qualités et défauts
function getQualitiesAndDefects() {
    return `Qualités:\n1. ${document.getElementById('quality1').value}\n2. ${document.getElementById('quality2').value}\n3. ${document.getElementById('quality3').value}\n\nDéfauts:\n1. ${document.getElementById('defect1').value}\n2. ${document.getElementById('defect2').value}\n3. ${document.getElementById('defect3').value}`;
}


function sendMail(email, subject, message) {
    // envoyer un mail avec mail js
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "yourusername",
        Password : "yourpassword",
        To : email,
        From : "yourgmail@gmail.com",
        Subject : subject,
        Body : message,
    }).then(message => alert(message));
}



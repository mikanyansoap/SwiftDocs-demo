// Services Data
const services = [
    { 
        title: 'PAG-IBIG Housing Loan Application Assistance', 
        category: 'Document assistance', 
        description: 'Assistance with loan applications and requirements.', 
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_2RHhmlSVL0aKS7boeubPu_7jdUtIYCGWgA&s' 
    },
    { 
        title: 'Permits & Licensing Assistance', 
        category: 'Document assistance', 
        description: 'Streamlining business and building permit acquisitions.', 
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMtySrR61Gqz-un-zIu4Gqf6mxUjVBBepEow&s' 
    },
    { 
        title: 'Title & Tax Declaration Services', 
        category: 'Legal', 
        description: 'Transfer of titles and tax declaration updates.', 
        image: 'https://static.wixstatic.com/media/1e77a3_27e08ecf7d654dc6a6900f98e84321e4~mv2.jpg/v1/fill/w_700,h_460,al_c,q_80,enc_avif,quality_auto/1e77a3_27e08ecf7d654dc6a6900f98e84321e4~mv2.jpg' 
    },
    { 
        title: 'Title Land Conversion', 
        category: 'Legal', 
        description: 'Converting agricultural land to residential or commercial.', 
        image: 'https://static.wixstatic.com/media/1e77a3_fae512e46395467d8d72e2456699f314~mv2.jpg/v1/fill/w_700,h_460,al_c,q_80,enc_avif,quality_auto/1e77a3_fae512e46395467d8d72e2456699f314~mv2.jpg' 
    }
];

// Why Us Data (Updated with Icons)
const experiences = [
    {
        icon: 'fa-solid fa-user-shield', // Icon for Trust/Experience
        header: 'Experienced Backbone', 
        desc: 'Operated by professionals with two decades of seasoned experience in real estate and documentation.'
    },
    {
        icon: 'fa-solid fa-handshake-simple', // Icon for Coordination
        header: 'Hands-on Coordination', 
        desc: 'We take the legwork off your shoulders by coordinating directly with government offices.'
    },
    {
        icon: 'fa-solid fa-magnifying-glass-chart', // Icon for Focus/Transparency
        header: 'Client Focused', 
        desc: 'Regular updates, well-documented steps, and competitive pricing with clear service breakdowns.'
    },
];

const contactInfo = [
    {
        icon: 'fa-solid fa-envelope', // Icon for Email
        textLoc: 'Email Us', 
        link: 'mailto:jhen.peduca@swiftdocservices.com',
        acc: 'jhen.peduca@swiftdocservices.com<br/><a class="none">.</a>'}
    ,  
    {
        icon: 'fa-solid fa-phone', // Icon for Phone
        textLoc: 'Call Us', 
        link: 'tel:+639179689038',
        acc: 'Jhen Peduca<br/>+63 917 968 9038'}
]

// Render Services
function renderServices() {
    const servicesGrid = document.getElementById('servicesGrid');

    if (servicesGrid) {
        servicesGrid.innerHTML = '';

        services.forEach((service, index) => {
            const item = document.createElement('div');
            item.className = 'services-item';
            item.style.animationDelay = `${index * 0.1}s`;

            item.innerHTML = `
                <div class="services-image">
                    <img src="${service.image}" alt="${service.title}" />
                </div>
                <div class="services-content">
                    <span class="services-category">${service.category}</span>
                    <h3 class="services-title">${service.title}</h3>
                    <p class="services-description">${service.description}</p>
                </div>
            `;

            servicesGrid.appendChild(item);
        });
    }
}

// Render Why Us (New Grid Layout)
function renderWhyUs() {
    const whyUsContent = document.getElementById('whyUsContent');

    if (whyUsContent) {
        whyUsContent.innerHTML = '';

        experiences.forEach((experience, index) => {
            const item = document.createElement('div');
            // 'whyUs-card-wrapper' handles the layout position
            item.className = 'whyUs-card-wrapper animate-on-scroll'; 
            item.style.animationDelay = `${index * 0.15}s`;

            item.innerHTML = `
                <div class="whyus-content-card">
                    <div class="icon-bubble">
                        <i class="${experience.icon}"></i>
                    </div>
                    <h3 class="whyus-header">${experience.header}</h3>
                    <p class="whyus-description">${experience.desc}</p>
                </div>
            `;

            whyUsContent.appendChild(item);
        });
    }
}

function renderContactInfo() {
    const contactContent = document.getElementById('contact-details');

    if (contactContent) {
        contactContent.innerHTML = '';

        contactInfo.forEach((contactInfo, index) => {
            const item = document.createElement('div');
            item.className = 'contactinfo-card animate-on-scroll'; 
            item.style.animationDelay = `${index * 0.15}s`;

            // Make the whole card clickable by moving onclick to the wrapper
            // or wrapping content in an <a> tag
            item.innerHTML = `
            <div class="contact-content" onclick="window.location.href='${contactInfo.link}'">
                <button class="contact-btn icon-bubble">
                    <i class="${contactInfo.icon} contact-icon"></i>
                </button>
                <p class="text-center">${contactInfo.textLoc}</p>
                <span class="text-center">${contactInfo.acc}</span>
            </div>
            `;

            contactContent.appendChild(item);
        });
    }
}

// Initialize on DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    renderServices();
    renderWhyUs();
    renderContactInfo();

});

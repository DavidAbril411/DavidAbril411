// Define la interfaz para una habilidad o concepto
interface Skill {
    name: string;
    level: number;
    id: string; // Para identificarla unívocamente
}

// Define la interfaz para una categoría de habilidades
interface SkillCategory {
    name: string;
    id: string; // ID único para la categoría (usado para pestañas)
    skills: Skill[];
    isGlossary?: boolean; // Nuevo: para indicar si es una categoría de glosario
    glossaryContent?: string; // Nuevo: para almacenar el HTML del glosario
}

// Datos iniciales de tu stack tecnológico
// Asegúrate de que los 'id' de categorías y skills sean únicos
const initialStack: SkillCategory[] = [
    {
        name: "I. Lenguajes de Programación", id: "lang-cat",
        skills: [
            { name: "C", level: 6, id: "lang-c" },
            { name: "C++", level: 7, id: "lang-cpp" },
            { name: "Java", level: 5, id: "lang-java" },
            { name: "JavaScript", level: 5, id: "lang-javascript" },
            { name: "TypeScript", level: 5, id: "lang-typescript" },
            { name: "Python", level: 0, id: "lang-python" },
            { name: "Go", level: 2, id: "lang-go" },
            { name: "C#", level: 3, id: "lang-csharp" },
            { name: "SQL", level: 5, id: "lang-sql" },
            { name: "Rust", level: 0, id: "lang-rust" },
            { name: "Perl", level: 0, id: "lang-perl" },
            { name: "Swift", level: 0, id: "lang-swift" },
            { name: "Fortran", level: 0, id: "lang-fortran" },
            { name: "COBOL", level: 0, id: "lang-cobol" },
            { name: "Objective-C", level: 0, id: "lang-objc" },
            { name: "Kotlin", level: 0, id: "lang-kotlin" },
            { name: "Ruby", level: 0, id: "lang-ruby" },
            { name: "PHP", level: 0, id: "lang-php" },
            { name: "Solidity", level: 0, id: "lang-solidity" },
        ]
    },
    {
        name: "II. Frameworks & Entornos de Ejecución", id: "fw-cat",
        skills: [
            { name: "Node.js", level: 4, id: "fw-nodejs" },
            { name: "React", level: 7, id: "fw-react" },
            { name: "jQuery", level: 0, id: "fw-jquery" },
            { name: "Next.js", level: 5, id: "fw-nextjs" },
            { name: "Express", level: 3, id: "fw-express" },
            { name: "Angular", level: 0, id: "fw-angular" },
            { name: "ASP.NET CORE", level: 0, id: "fw-aspnet" },
            { name: "Vue.js", level: 0, id: "fw-vuejs" },
            { name: "Spring Boot", level: 3, id: "fw-springboot" },
            { name: "Django", level: 0, id: "fw-django" },
            { name: "Astro", level: 2, id: "fw-astro" },
            { name: "NestJS", level: 5, id: "fw-nestjs" },
            { name: "Svelte", level: 0, id: "fw-svelte" },
            { name: "FastAPI", level: 2, id: "fw-fastapi" },
            { name: "Nuxt.js", level: 0, id: "fw-nuxtjs" },
            { name: "SvelteKit", level: 0, id: "fw-sveltekit" },
            { name: "Lit", level: 0, id: "fw-lit" },
        ]
    },
    {
        name: "III. Bases de Datos", id: "db-cat",
        skills: [
            { name: "SQL", level: 5, id: "db-sql" },
            { name: "MySQL", level: 0, id: "db-mysql" },
            { name: "PostgreSQL", level: 0, id: "db-postgresql" },
            { name: "SQL Server", level: 0, id: "db-sqlserver" },
            { name: "Oracle", level: 0, id: "db-oracle" },
            { name: "MongoDB", level: 0, id: "db-mongodb" },
            { name: "Redis (Caché)", level: 0, id: "db-redis" },
            { name: "Cassandra", level: 0, id: "db-cassandra" },
            { name: "Neo4j", level: 0, id: "db-neo4j" },
            { name: "DynamoDB", level: 0, id: "db-dynamodb" },
            { name: "Firestore", level: 0, id: "db-firestore" },
        ]
    },
    {
        name: "IV. Estilizado y UI/UX", id: "uiux-cat",
        skills: [
            { name: "Sass/SCSS", level: 0, id: "style-sass" },
            { name: "Less", level: 0, id: "style-less" },
            { name: "Tailwind CSS", level: 0, id: "style-tailwind" },
            { name: "Bootstrap", level: 0, id: "style-bootstrap" },
            { name: "Material-UI", level: 0, id: "style-materialui" },
            { name: "Chakra UI", level: 0, id: "style-chakraui" },
            { name: "Figma", level: 0, id: "tool-figma" },
            { name: "Sketch", level: 0, id: "tool-sketch" },
            { name: "Adobe XD", level: 0, id: "tool-adobexd" },
            { name: "Adobe Photoshop", level: 0, id: "tool-photoshop" },
            { name: "Adobe Illustrator", level: 0, id: "tool-illustrator" },
        ]
    },
    {
        name: "V. Arquitectura y Escalabilidad (Conceptos y Tecnologías Clave)", id: "arch-cat",
        skills: [
            { name: "Programación Orientada a Objetos (OOP)", level: 0, id: "conc-oop" },
            { name: "Programación Funcional (FP)", level: 0, id: "conc-fp" },
            { name: "Programación Orientada a Eventos", level: 0, id: "conc-eventdriven" },
            { name: "Programación Concurrente/Paralela", level: 0, id: "conc-concurrency" },
            { name: "Programación Reactiva", level: 0, id: "conc-reactive" },
            { name: "Singleton", level: 0, id: "dp-singleton" },
            { name: "Factory Method", level: 0, id: "dp-factory" },
            { name: "Observer", level: 0, id: "dp-observer" },
            { name: "Strategy", level: 0, id: "dp-strategy" },
            { name: "Decorator", level: 0, id: "dp-decorator" },
            { name: "Facade", level: 0, id: "dp-facade" },
            { name: "DRY (Don't Repeat Yourself)", level: 0, id: "princ-dry" },
            { name: "KISS (Keep It Simple, Stupid)", level: 0, id: "princ-kiss" },
            { name: "YAGNI (You Ain't Gonna Need It)", level: 0, id: "princ-yagni" },
            { name: "Separación de Intereses", level: 0, id: "princ-soi" },
            { name: "Cohesión y Acoplamiento", level: 0, id: "princ-cohesion" },
            { name: "Arrays, Listas Enlazadas, Pilas, Colas", level: 0, id: "ds-basic" },
            { name: "Árboles, Grafos", level: 0, id: "ds-advanced" },
            { name: "Algoritmos de búsqueda y ordenamiento", level: 0, id: "algo-searchsort" },
            { name: "Monolítico", level: 0, id: "arch-monolithic" },
            { name: "Microservicios", level: 0, id: "arch-microservices" },
            { name: "Serverless (FaaS)", level: 0, id: "arch-serverless" },
            { name: "Event-Driven Architecture", level: 0, id: "arch-eventdriven" },
            { name: "Micro Frontends", level: 0, id: "arch-microfrontends" },
            { name: "Clean Architecture / Hexagonal Architecture", level: 0, id: "arch-cleanhex" },
            { name: "Domain-Driven Design (DDD)", level: 0, id: "arch-ddd" },
            { name: "Docker", level: 0, id: "ops-docker" },
            { name: "Kubernetes (K8s)", level: 0, id: "ops-kubernetes" },
            { name: "Docker Compose", level: 0, id: "ops-dockercompose" },
            { name: "Docker Hub", level: 0, id: "ops-dockerhub" },
            { name: "Helm", level: 0, id: "ops-helm" },
            { name: "AWS (Conceptos Generales)", level: 0, id: "cloud-aws" },
            { name: "EC2", level: 0, id: "cloud-ec2" },
            { name: "S3", level: 0, id: "cloud-s3" },
            { name: "Lambda", level: 0, id: "cloud-lambda" },
            { name: "RDS", level: 0, id: "cloud-rds" },
            { name: "SQS", level: 0, id: "cloud-sqs" },
            { name: "SNS", level: 0, id: "cloud-sns" },
            { name: "API Gateway", level: 0, id: "cloud-apigw" },
            { name: "CloudFront", level: 0, id: "cloud-cloudfront" },
            { name: "IAM", level: 0, id: "cloud-iam" },
            { name: "Azure (Conceptos Generales)", level: 0, id: "cloud-azure" },
            { name: "Azure Functions", level: 0, id: "cloud-azurefn" },
            { name: "Azure SQL Database", level: 0, id: "cloud-azuresql" },
            { name: "GCP (Conceptos Generales)", level: 0, id: "cloud-gcp" },
            { name: "Compute Engine", level: 0, id: "cloud-compute" },
            { name: "Cloud Storage", level: 0, id: "cloud-storage" },
            { name: "Cloud Functions", level: 0, id: "cloud-gcpfn" },
            { name: "Cloud SQL", level: 0, id: "cloud-gcpsql" },
            { name: "Vercel", level: 0, id: "deploy-vercel" },
            { name: "Render", level: 0, id: "deploy-render" },
            { name: "Heroku", level: 0, id: "deploy-heroku" },
            { name: "Firebase", level: 0, id: "deploy-firebase" },
            { name: "Supabase", level: 0, id: "deploy-supabase" },
            { name: "Jenkins", level: 0, id: "ci-jenkins" },
            { name: "GitLab CI/CD", level: 0, id: "ci-gitlab" },
            { name: "GitHub Actions", level: 0, id: "ci-githubactions" },
            { name: "CircleCI", level: 0, id: "ci-circleci" },
            { name: "Travis CI", level: 0, id: "ci-travis" },
            { name: "Bitbucket Pipelines", level: 0, id: "ci-bitbucket" },
            { name: "Terraform", level: 0, id: "iac-terraform" },
            { name: "AWS CloudFormation", level: 0, id: "iac-cloudformation" },
            { name: "Azure Resource Manager", level: 0, id: "iac-arm" },
            { name: "Google Cloud Deployment Manager", level: 0, id: "iac-gcpdm" },
            { name: "Prometheus", level: 0, id: "monitor-prometheus" },
            { name: "Grafana", level: 0, id: "monitor-grafana" },
            { name: "ELK Stack", level: 0, id: "monitor-elk" },
            { name: "CloudWatch", level: 0, id: "monitor-cloudwatch" },
            { name: "Datadog", level: 0, id: "monitor-datadog" },
            { name: "Sentry", level: 0, id: "monitor-sentry" },
            { name: "Git", level: 0, id: "vc-git" },
            { name: "GitHub", level: 0, id: "vc-github" },
            { name: "GitLab", level: 0, id: "vc-gitlab" },
            { name: "Bitbucket", level: 0, id: "vc-bitbucket" },
            { name: "Kafka", level: 0, id: "mq-kafka" },
            { name: "RabbitMQ", level: 0, id: "mq-rabbitmq" },
            { name: "SQS (AWS)", level: 0, id: "mq-sqs" },
            { name: "Google Cloud Pub/Sub", level: 0, id: "mq-pubsub" },
            { name: "gRPC", level: 0, id: "rpc-grpc" },
        ]
    },
    {
        name: "VI. Calidad y Seguridad del Software", id: "quality-cat",
        skills: [
            { name: "Principios SOLID", level: 0, id: "quality-solid" },
            { name: "Pruebas Unitarias", level: 0, id: "test-unit" },
            { name: "Pruebas de Integración", level: 0, id: "test-integration" },
            { name: "Pruebas End-to-End (E2E)", level: 0, id: "test-e2e" },
            { name: "Pruebas de Rendimiento/Carga", level: 0, id: "test-perf" },
            { name: "ESLint", level: 0, id: "static-eslint" },
            { name: "SonarQube", level: 0, id: "static-sonarqube" },
            { name: "Prettier", level: 3, id: "static-prettier" },
            { name: "OWASP Top 10", level: 0, id: "security-owasp" },
            { name: "Criptografía Básica", level: 0, id: "security-crypto" },
        ]
    },
    {
        name: "VII. Conceptos Emergentes / Relevantes", id: "emerging-cat",
        skills: [
            { name: "Inteligencia Artificial y Machine Learning (Aplicaciones)", level: 0, id: "emerging-ai" },
            { name: "Web3 / Blockchain", level: 0, id: "emerging-web3" },
            { name: "Edge Computing", level: 0, id: "emerging-edge" },
            { name: "WebAssembly (Wasm)", level: 0, id: "emerging-wasm" },
            { name: "Strapi.io", level: 0, id: "emerging-strapi" },
        ]
    },
    // NUEVA CATEGORÍA: Glosario de Niveles
    {
        name: "Glosario de Niveles", id: "glossary-cat",
        skills: [], // Sin habilidades interactivas
        isGlossary: true,
        glossaryContent: `
            <p><strong>0: Desconocido / No aplicable</strong></p>
            <p>No tengo conocimiento alguno sobre esta tecnología o concepto, o no es relevante para mis objetivos actuales.</p>
            <p><strong>1: Nociones Básicas / Reconocimiento</strong></p>
            <p>Sé que existe y para qué sirve a un nivel muy superficial. Podría reconocerlo en una conversación o en un documento, pero no tengo experiencia práctica ni comprensión de sus detalles.</p>
            <p><strong>2: Familiaridad / Lectura General</strong></p>
            <p>He leído sobre el tema y entiendo sus principios fundamentales y su propósito. Podría buscar información sobre cómo usarlo o implementarlo, pero no tengo experiencia práctica.</p>
            <p><strong>3: Explorador / Primeros Pasos</strong></p>
            <p>He hecho algún tutorial básico o he explorado la tecnología/concepto en un entorno de pruebas simple. Puedo realizar tareas muy básicas siguiendo ejemplos, pero mi comprensión es limitada y mi capacidad de resolución de problemas es baja.</p>
            <p><strong>4: Uso Básico / Proyectos Pequeños (con asistencia)</strong></p>
            <p>He utilizado esta tecnología/concepto en algún proyecto pequeño o personal, a menudo siguiendo tutoriales o con la ayuda de herramientas (como IA para sintaxis) para superar bloqueos. Puedo implementar funcionalidades básicas pero necesito documentación frecuente o asistencia.</p>
            <p><strong>5: Usuario Capaz / Desarrollo con Guía</strong></p>
            <p>Puedo usar esta tecnología/concepto para desarrollar funcionalidades estándar en un proyecto. Entiendo la mayoría de sus características principales y puedo resolver problemas comunes con documentación. Podría trabajar en un equipo bajo la guía de un senior.</p>
            <p><strong>6: Competente / Desarrollo Independiente</strong></p>
            <p>Puedo desarrollar y mantener aplicaciones o funcionalidades complejas utilizando esta tecnología/concepto de forma independiente. Entiendo sus mejores prácticas y puedo depurar problemas de manera efectiva. Estoy listo para contribuir significativamente en un equipo.</p>
            <p><strong>7: Avanzado / Resolución de Problemas Complejos</strong></p>
            <p>Tengo experiencia sólida en el desarrollo y depuración de sistemas complejos con esta tecnología/concepto. Puedo diseñar soluciones eficientes, optimizar el rendimiento y resolver problemas no triviales de forma autónoma. Contribuyo con ideas de mejora.</p>
            <p><strong>8: Experto / Liderazgo Técnico / Mentoría</strong></p>
            <p>Soy considerado un experto en esta tecnología/concepto. Puedo liderar proyectos, diseñar arquitecturas robustas, mentorizar a otros desarrolladores, y resolver los problemas más desafiantes. Conozco las entrañas y las limitaciones.</p>
            <p><strong>9: Especialista / Referente de la Industria</strong></p>
            <p>Soy un referente reconocido en esta área. He contribuido a la comunidad (charlas, artículos, código abierto), he liderado equipos grandes o proyectos críticos, y mi conocimiento es excepcionalmente profundo y actualizado.</p>
            <p><strong>10: Maestro / Visionario</strong></p>
            <p>He creado o contribuido significativamente al desarrollo de la propia tecnología/concepto, o he realizado avances pioneros en su aplicación. Mi nivel de impacto y conocimiento es de élite mundial. (Este nivel es raro y se aplica a los creadores de tecnologías o a investigadores de punta).</p>
        `
    }
];

// Función para guardar el stack en localStorage
function saveStack(stack: SkillCategory[]): void {
    // No guardamos el contenido del glosario en localStorage para evitar redundancia
    const stackToSave = stack.map(cat => ({
        ...cat,
        glossaryContent: undefined // Excluir esta propiedad del guardado
    }));
    localStorage.setItem('myTechStack', JSON.stringify(stackToSave));
}

// Función para cargar el stack de localStorage
function loadStack(): SkillCategory[] {
    const storedStack = localStorage.getItem('myTechStack');
    if (storedStack) {
        try {
            const parsedStack: SkillCategory[] = JSON.parse(storedStack);
            // Fusionar con initialStack para añadir nuevas habilidades/categorías
            // y asegurar que el glosario siempre tenga su contenido estático
            return initialStack.map(cat => {
                const storedCat = parsedStack.find(sCat => sCat.id === cat.id);
                if (storedCat && !cat.isGlossary) { // Si no es glosario, fusionar niveles
                    return {
                        ...cat,
                        skills: cat.skills.map(skill => {
                            const storedSkill = storedCat.skills.find(sSkill => sSkill.id === skill.id);
                            return storedSkill ? { ...skill, level: storedSkill.level } : skill;
                        })
                    };
                }
                return cat; // Para glosario o nuevas categorías, usar datos iniciales
            });
        } catch (e) {
            console.error("Error al parsear el stack de localStorage, usando el stack inicial.", e);
            return initialStack;
        }
    }
    return initialStack;
}

// Estado actual del stack
let currentStack: SkillCategory[] = loadStack();
// Establecer la primera pestaña activa, o el glosario si es la primera
let activeTabId: string = currentStack[0].id; 


// Función para crear un elemento de habilidad individual
function createSkillElement(skill: Skill): HTMLElement {
    const skillDiv = document.createElement('div');
    skillDiv.className = 'skill-item';
    skillDiv.dataset.skillId = skill.id;

    const skillNameSpan = document.createElement('span');
    skillNameSpan.className = 'skill-name';
    skillNameSpan.textContent = skill.name;
    skillDiv.appendChild(skillNameSpan);

    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'skill-level-controls';

    const decreaseButton = document.createElement('button');
    decreaseButton.className = 'level-button decrease';
    const decreaseIcon = document.createElement('i');
    decreaseIcon.className = 'fas fa-minus';
    decreaseButton.appendChild(decreaseIcon);
    decreaseButton.onclick = () => updateSkillLevel(skill.id, -1);
    controlsDiv.appendChild(decreaseButton);

    const levelDisplay = document.createElement('span');
    levelDisplay.className = 'level-display';
    levelDisplay.textContent = `${skill.level}/10`;
    controlsDiv.appendChild(levelDisplay);

    const increaseButton = document.createElement('button');
    increaseButton.className = 'level-button increase';
    const increaseIcon = document.createElement('i');
    increaseIcon.className = 'fas fa-plus';
    increaseButton.appendChild(increaseIcon);
    increaseButton.onclick = () => updateSkillLevel(skill.id, 1);
    controlsDiv.appendChild(increaseButton);

    skillDiv.appendChild(controlsDiv);
    return skillDiv;
}

// Función para renderizar una sección de categoría completa
function renderCategoryContent(category: SkillCategory): HTMLElement {
    const sectionDiv = document.createElement('section');
    sectionDiv.className = 'category-section';

    const h2 = document.createElement('h2');
    h2.textContent = category.name;
    sectionDiv.appendChild(h2);

    if (category.isGlossary && category.glossaryContent) {
        // Si es la sección de glosario, inyecta el HTML directamente
        sectionDiv.classList.add('glossary'); // Añadir clase para estilos específicos
        const glossaryDiv = document.createElement('div');
        glossaryDiv.innerHTML = category.glossaryContent;
        sectionDiv.appendChild(glossaryDiv);
    } else {
        // Si es una categoría normal, crea la grid de habilidades
        const skillsGridContainer = document.createElement('div');
        skillsGridContainer.className = 'skills-grid';
        
        category.skills.forEach(skill => {
            skillsGridContainer.appendChild(createSkillElement(skill));
        });
        sectionDiv.appendChild(skillsGridContainer);
    }

    return sectionDiv;
}

// Función para renderizar los botones de las pestañas
function renderTabButtons(): void {
    const tabButtonsContainer = document.querySelector('.tab-buttons');
    if (!tabButtonsContainer) return;

    tabButtonsContainer.innerHTML = '';

    currentStack.forEach(category => {
        const button = document.createElement('button');
        button.className = `tab-button ${category.id === activeTabId ? 'active' : ''}`;
        
        // Mostrar "Glosario" completo, o el número si es una categoría de habilidades
        const buttonText = category.isGlossary ? category.name : (category.name.match(/^[IVX]+\./) ? category.name.match(/^[IVX]+\./)![0] : category.name);
        button.textContent = buttonText;
        
        button.dataset.categoryId = category.id;
        button.onclick = () => switchTab(category.id);
        tabButtonsContainer.appendChild(button);
    });
}

// Función para cambiar de pestaña
function switchTab(categoryId: string): void {
    activeTabId = categoryId;
    renderStackContent();
    renderTabButtons();
}

// Función principal para renderizar el contenido del stack (solo la pestaña activa)
function renderStackContent(): void {
    const container = document.getElementById('stack-container');
    if (container) {
        container.innerHTML = '';
        const activeCategory = currentStack.find(cat => cat.id === activeTabId);
        if (activeCategory) {
            container.appendChild(renderCategoryContent(activeCategory));
        }
    }
}

// Función para actualizar el nivel de una habilidad
function updateSkillLevel(skillId: string, change: number): void {
    let updated = false;
    currentStack = currentStack.map(category => {
        // Solo actualizar si no es una categoría de glosario
        if (!category.isGlossary) {
            return {
                ...category,
                skills: category.skills.map(skill => {
                    if (skill.id === skillId) {
                        const newLevel = Math.max(0, Math.min(10, skill.level + change));
                        if (newLevel !== skill.level) {
                            updated = true;
                            return { ...skill, level: newLevel };
                        }
                    }
                    return skill;
                })
            };
        }
        return category; // Devolver categoría sin cambios si es glosario
    });

    if (updated) {
        saveStack(currentStack);
        renderStackContent();
    }
}

// Inicia la renderización de botones y contenido cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
    // Asegurar que si es la primera vez, el glosario sea la pestaña activa
    // o si el primer elemento inicial es el glosario
    if (currentStack.length > 0 && currentStack[0].isGlossary) {
        activeTabId = currentStack[0].id;
    } else if (currentStack.length > 0 && !currentStack.some(cat => cat.id === activeTabId)) {
        // Si la pestaña activa guardada no existe (ej. se borró), ir a la primera
        activeTabId = currentStack[0].id;
    }

    renderTabButtons();
    renderStackContent();
});
// Conductum - Ciencia y empatía para tu bienestar 💚
// Carga dinámica desde CSV Replit

const CSV_URL = "https://7a61f8db-6aa6-4146-b2a2-501dcc9c75d4-00-3mnjm9m1d5yli.spock.replit.dev/data/conductum_datos_1763498980039.csv";

async function cargarConductum() {
  try {
    const response = await fetch(CSV_URL);
    const text = await response.text();
    const rows = text.split("\n").slice(1);

    const mitos = [], servicios = [], especialistas = [], bibliografia = [];

    for (const row of rows) {
      const [tipo, campo, valor1, valor2, valor3, valor4] = row.split(",");

      if (tipo === "mito") {
        mitos.push({ mito: campo, realidad: valor1, fuente: valor2, imagen: valor3 });
      } else if (tipo === "servicio") {
        servicios.push({ nombre: campo, descripcion: valor1 });
      } else if (tipo === "especialista") {
        especialistas.push({ nombre: campo, especialidad: valor1, experiencia: valor2, imagen: valor3 });
      } else if (tipo === "bibliografía") {
        bibliografia.push({ referencia: campo, enlace: valor1 });
      }
    }

    renderMitos(mitos);
    renderServicios(servicios);
    renderEspecialistas(especialistas);
    renderBibliografia(bibliografia);
  } catch (err) {
    console.error("Error al cargar Conductum:", err);
  }
}

function renderMitos(mitos) {
  document.getElementById("mitos-container").innerHTML = mitos.map(m => `
    <div class="card">
      <div class="card-inner">
        <div class="card-front">
          <img src="${m.imagen}" alt="Imagen mito">
          <h3>${m.mito}</h3>
        </div>
        <div class="card-back">
          <p>${m.realidad}</p>
          <small>${m.fuente}</small>
        </div>
      </div>
    </div>
  `).join("");
}

function renderServicios(servicios) {
  document.getElementById("servicios-container").innerHTML = servicios.map(s => `
    <article><h3>${s.nombre}</h3><p>${s.descripcion}</p></article>
  `).join("");
}

function renderEspecialistas(especialistas) {
  document.getElementById("especialistas-container").innerHTML = especialistas.map(e => `
    <div class="perfil">
      <img src="${e.imagen}" alt="${e.nombre}">
      <h3>${e.nombre}</h3>
      <p><strong>${e.especialidad}</strong></p>
      <p>${e.experiencia}</p>
    </div>
  `).join("");
}

function renderBibliografia(bibliografia) {
  document.getElementById("bibliografia-container").innerHTML = bibliografia.map(b => `
    <li><a href="${b.enlace}" target="_blank">${b.referencia}</a></li>
  `).join("");
}

document.addEventListener("DOMContentLoaded", cargarConductum);

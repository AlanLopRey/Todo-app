(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))d(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&d(s)}).observe(document,{childList:!0,subtree:!0});function c(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(o){if(o.ep)return;o.ep=!0;const n=c(o);fetch(o.href,n)}})();//!7-t permitir que las tareas se guarden en el localstorage
const a=document.querySelector(".form"),i=document.querySelector(".todos"),l=document.querySelector(".form__input"),m=document.querySelector("#clear-completed"),p=document.querySelector(".todo-actions__spn--p");function f(t){const e=`
    <div class="todo">
      <div class="todo-wrapper">
        <input
          class="todo-checkbox"
          type="checkbox"
          name="todo-check"
          id="checkbox"
        />
        <p class="todo__p">${t}</p>
      </div>
      <img
        src="../images/icon-cross.svg"
        alt="delete a todo"
        class="delete-todo"
      />
    </div>
  `,c=document.createElement("div");return c.innerHTML=e,c}function h(){a.addEventListener("submit",t=>{t.preventDefault();const e=l.value.trim();if(e!==""){const c=f(e);i.appendChild(c),l.value="",y(c),r()}})}function y(t){const e=t.querySelector(".todo-checkbox"),c=t.querySelector(".todo__p");e.addEventListener("change",()=>{c.classList.toggle("checked-active",e.checked),r()})}function r(){const t=document.querySelectorAll(".todo-checkbox").length,e=document.querySelectorAll(".todo-checkbox:checked").length,c=t-e;p.textContent=c}function u(t){t.remove(),r()}m.addEventListener("click",()=>{document.querySelectorAll(".todo-checkbox:checked").forEach(e=>{const c=e.closest(".todo");c&&u(c)})});i.addEventListener("click",t=>{if(t.target.classList.contains("delete-todo")){const e=t.target.closest(".todo");e&&u(e)}});function g(){h(),r()}g();

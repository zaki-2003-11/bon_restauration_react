import Axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";


export default function Personnes() {

   const [selectedIds, setSelectedIds] = useState([]);
   const [search, setSearch] = useState("");

   const inp_type = useRef();
   const inp_date = useRef();



   const navigate = useNavigate();

   const inp_num = useRef();
   const inp_nom = useRef();
   const inp_prenom = useRef();
   // const btn_ajt = useRef();

   const form_ajt = useRef();
   const form_bon = useRef();

   const [data, setData] = useState([]);

   const imprimer = (e) => {
      e.preventDefault();
      const personnesSelectionnees =
         data.filter(p => selectedIds.includes(p.id));

      navigate("/print", {
         state: {
            personnes: personnesSelectionnees,
            type: inp_type.current.value,
            date: inp_date.current.value
         }
      });

   };
   useEffect(() => {
      inp_date.current.value = new Date().toISOString().split("T")[0];
   }, []);

   useEffect(() => { Axios.get("http://localhost:5000/personnes").then((res) => setData(res.data)) }, []);

   const ajouter_personne = async (e) => {
      e.preventDefault();
      let per = {
         id: Number(inp_num.current.value),
         nom: inp_nom.current.value,
         prenom: inp_prenom.current.value
      };


      try {

         await Axios.post("http://localhost:5000/personnes", per);
         setData([...data, per]);

         alert("Person added successfully.");

      } catch (err) {

         if (err.response) {
            alert(err.response.data.message);
         } else {
            alert("Server error.");
         }

      }



      form_ajt.current.reset();
   }

   const filteredData = data.filter((person) =>
      person.nom.toLowerCase().includes(search.toLowerCase()) ||
      person.prenom.toLowerCase().includes(search.toLowerCase())
      // ||
      // person.id.toString().includes(search)
   );

   const selectedPersons = data.filter(person =>
      selectedIds.includes(person.id)
   );

   return (
      <>

         <main>


            <div className="container mt-5">
               <div className="row g-4">


                  <div className="col-lg-4">
                     <div className="card shadow border-0 rounded-4">
                        <div className="card-header bg-primary text-white rounded-top-4">
                           <h4 className="mb-0">👥 Liste des Personnes</h4>
                        </div>

                        <div className="card-body">
                           <div className="mb-3">
                              <div className="input-group">
                                 <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Rechercher..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                 />

                                 {search && (
                                    <button
                                       type="button"
                                       className="btn btn-outline-secondary"
                                       onClick={() => setSearch("")}
                                    >
                                       <i className="bi bi-x-circle-fill"></i>

                                    </button>
                                 )}
                              </div>
                           </div>
                           <table className="table table-hover table-striped align-middle text-center">
                              <thead className="table-dark">
                                 <tr>
                                    <th></th>
                                    <th>Num</th>
                                    <th>Nom</th>
                                    <th>Prénom</th>
                                 </tr>
                              </thead>

                              <tbody>
                                 {
                                    filteredData.map((d) =>
                                       <tr key={d.id}>
                                          <td>
                                             <input
                                                type="checkbox"
                                                className="form-check-input big-checkbox"
                                                checked={selectedIds.includes(d.id)}
                                                onChange={(e) => {

                                                   if (e.target.checked) {
                                                      setSelectedIds([...selectedIds, d.id]);
                                                   } else {
                                                      setSelectedIds(
                                                         selectedIds.filter(id => id !== d.id)
                                                      );
                                                   }

                                                }}
                                             />
                                          </td>
                                          <td>{d.id}</td>
                                          <td>{d.nom}</td>
                                          <td>{d.prenom}</td>
                                       </tr>
                                    )
                                 }
                              </tbody>

                           </table>

                        </div>
                     </div>
                  </div>

                  <div className="col-lg-4">
                     <form ref={form_bon} >

                        <div className="card shadow border-0 rounded-4">
                           <div className="card-header bg-warning text-dark rounded-top-4">
                              <h4 className="mb-0">🍽 Bon de Restauration</h4>
                           </div>

                           <div className="card-body">




                              <div className="mb-3">
                                 <label className="form-label fw-bold">
                                    Type
                                 </label>

                                 <select className="form-select" name="type" ref={inp_type}>
                                    <option value="déjeuner">Déjeuner</option>
                                    <option value="diner">Dîner</option>
                                    <option value="diner_déjeuner">Déjeuner et Dîner</option>
                                 </select>
                              </div>

                              <div className="mb-4">
                                 <label className="form-label fw-bold">
                                    Date
                                 </label>

                                 <input className="form-control" type="date" name="date" ref={inp_date} />
                              </div>

                              <div className="d-grid">
                                 <button className="btn btn-warning rounded-pill" onClick={(e) => imprimer(e)}>
                                    Valider
                                 </button>


                              </div>



                           </div>
                        </div>
                     </form>
                     <div className="card mt-3 shadow border-0 rounded-4">
                        <div className="card-header bg-info text-white">
                           <h5 className="mb-0">
                              Personnes sélectionnées ({selectedPersons.length})
                           </h5>
                        </div>

                        <div className="card-body p-2">
                           {selectedPersons.length === 0 ? (
                              <p className="text-muted text-center mb-0">
                                 Aucune personne sélectionnée
                              </p>
                           ) : (
                              <ul className="list-group">
                                 {selectedPersons.map((person) => (
                                    <li
                                       key={person.id}
                                       className="list-group-item d-flex justify-content-between align-items-center"
                                    >
                                       <span>
                                          <strong>{person.id}</strong> - {person.nom} {person.prenom}
                                       </span>

                                       <button
                                          type="button"
                                          className="btn btn-sm btn-outline-danger"
                                          onClick={() =>
                                             setSelectedIds(prev =>
                                                prev.filter(id => id !== person.id)
                                             )
                                          }
                                       >
                                          <i className="bi bi-x-lg"></i>
                                       </button>
                                    </li>
                                 ))}
                              </ul>
                           )}
                        </div>
                     </div>
                  </div>

                  <div className="col-lg-4">
                     <div className="card shadow border-0 rounded-4">
                        <div className="card-header bg-success text-white rounded-top-4">
                           <h4 className="mb-0">➕ Ajouter une Personne</h4>
                        </div>

                        <div className="card-body">

                           <form ref={form_ajt}>

                              <div className="mb-3">
                                 <label className="form-label fw-bold">
                                    Num
                                 </label>

                                 <input type="text" className="form-control" ref={inp_num} placeholder="Num" />
                              </div>
                              <div className="mb-3">
                                 <label className="form-label fw-bold">
                                    Nom
                                 </label>

                                 <input type="text" className="form-control" ref={inp_nom} placeholder="Nom" />
                              </div>

                              <div className="mb-3">
                                 <label className="form-label fw-bold">
                                    Prénom
                                 </label>

                                 <input type="text" className="form-control" ref={inp_prenom} placeholder="Prénom" />
                              </div>

                              <div className="d-grid">
                                 <input type="submit" value="Ajouter" className="btn btn-success rounded-pill" onClick={(e) => ajouter_personne(e)} />

                              </div>

                           </form>

                        </div>
                     </div>
                  </div>




               </div>
            </div>

         </main >
      </>
   );
}



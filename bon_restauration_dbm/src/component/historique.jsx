import { useEffect, useState } from "react";
import Axios from "axios";

export default function Historique() {

   const [historique, setHistorique] = useState([]);

   const [nom, setNom] = useState("");
   const [date, setDate] = useState("");
   const [type, setType] = useState("tous");
   const [resume, setResume] = useState({

      total: 0,

      déjeuner: 0,

      déner: 0

   });
   const chargerHistorique = async () => {


      try {

         const res = await Axios.get("http://localhost:5000/historique", {

            params: {
               nom,
               type,
               date
            }

         });

         const data = res.data;

         setHistorique(data);

         setResume({

            total: data.length,

            déjeuner: data.filter(x => x.type === "déjeuner").length,

            dîner: data.filter(x => x.type === "dîner").length

         });

      } catch (err) {

         console.log(err);

      }

   };

   useEffect(() => {

      const timer = setTimeout(() => {

         chargerHistorique();

      }, 300);

      return () => clearTimeout(timer);

   }, [nom, date, type]);

   return (

      <div className="container mt-5">

         <div className="card shadow">

            <div className="card-header bg-primary text-white">

               <h3>Historique des consommations</h3>

            </div>

            <div className="card-body">

               <div className="row g-3 mb-4">

                  <div className="col-md-5">

                     <label className="form-label">
                        Nom ou prénom
                     </label>

                     <input
                        className="form-control"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        placeholder="Rechercher..."
                     />

                  </div>

                  <div className="col-md-3">

                     <label className="form-label">
                        Date
                     </label>

                     <input
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                     />

                  </div>

                  <div className="col-md-4">

                     <label className="form-label">
                        Type
                     </label>

                     <select
                        className="form-select"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                     >

                        <option value="tous">Tous</option>

                        <option value="déjeuner">
                           Déjeuner
                        </option>

                        <option value="dîner">
                           Dîner
                        </option>

                     </select>

                  </div>

               </div>
               <div className="row mb-4">

                  <div className="col-md-4">

                     <div className="card text-center shadow">

                        <div className="card-body">

                           <h6 className="text-muted">

                              Total

                           </h6>

                           <h2>

                              {resume.total}

                           </h2>

                        </div>

                     </div>

                  </div>

                  <div className="col-md-4">

                     <div className="card text-center shadow border-success">

                        <div className="card-body">

                           <h6 className="text-success">

                              Déjeuners

                           </h6>

                           <h2>

                              {resume.déjeuner}

                           </h2>

                        </div>

                     </div>

                  </div>

                  <div className="col-md-4">

                     <div className="card text-center shadow border-warning">

                        <div className="card-body">

                           <h6 className="text-warning">

                              Dîners

                           </h6>

                           <h2>

                              {resume.dîner}

                           </h2>

                        </div>

                     </div>

                  </div>

               </div>
               <table className="table table-striped table-hover">

                  <thead className="table-dark">

                     <tr>

                        <th>Date</th>

                        <th>Heure</th>

                        <th>N°</th>

                        <th>Nom</th>

                        <th>Prénom</th>

                        <th>Type</th>

                     </tr>

                  </thead>

                  <tbody>

                     {
                        historique.length === 0 ?

                           (

                              <tr>

                                 <td colSpan="6" className="text-center text-muted">

                                    Aucun résultat trouvé.

                                 </td>

                              </tr>

                           )

                           :
                           historique.map((h, index) => (

                              <tr key={index}>

                                 <td>
                                    {
                                       new Date(h.date).toLocaleDateString("fr-FR", {

                                          day: "2-digit",
                                          month: "2-digit",
                                          year: "numeric"

                                       })
                                    }
                                 </td>

                                 <td>{h.heure}</td>

                                 <td>{h.personneId}</td>

                                 <td>{h.nom}</td>

                                 <td>{h.prenom}</td>

                                 <td>{h.type}</td>

                              </tr>

                           ))
                     }

                  </tbody>

               </table>

            </div>

         </div>

      </div>

   );

}
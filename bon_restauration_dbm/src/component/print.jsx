import { useLocation } from "react-router-dom";
import { useEffect } from "react";



export default function Print() {
   const { state } = useLocation();

   const personnes = state?.personnes || [];
   const type = state?.type || "";
   const date = state?.date || "";



   useEffect(() => {
      const timer = setTimeout(() => {
         window.print();
      }, 300);

      return () => clearTimeout(timer);
   }, []);
   return (
      <>
         {personnes.flatMap((per) => {
            const types =
               type === "dîner_déjeuner"
                  ? ["Dîner", "Déjeuner"]
                  : [type];

            return types.map((mealType, index) => (
               <div className="page" key={`${per.id}-${index}`}>

                  <div className="header">

                     <div className="logo-text">
                        <div>ROYAUME DU MAROC</div>
                        <div>MINISTERE DE L’INTERIEUR</div>
                        <div>WILAYA DE LA REGION TANGER-TETOUAN–</div>
                        <div>AL HOCEIMA</div>
                        <div>PREFECTURE TANGER-ASSILAH</div>
                        <div>SECRETARIAT GENERAL</div>
                        <div className="dbm">D.B.M</div>
                     </div>

                     <div className="title">
                        <h2>BON DE RESTAURATION <br />({mealType})</h2>
                        <h3>N° . . . . . . . . . .</h3>
                     </div>

                  </div>

                  <div className="content">

                     <p>
                        <strong>
                           Le présent bon donne droit à un repas au profit de son titulaire.
                        </strong>
                     </p>

                     <p>
                        A présenter au restaurant avant toute consommation.
                     </p>

                  </div>

                  <div className="fields">

                     <div className="field">
                        <strong>Nom et Prénom du bénéficiaire :</strong>
                        {" "}
                        {per.nom} {per.prenom}
                     </div>

                     <div className="field">

                        <strong>Date :</strong>
                        {" "}
                        {date}

                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                        <strong>Heure :</strong>
                        {" "} . . . . . . . . .


                     </div>

                  </div>

                  <div className="signature-box">

                     <div className="left">
                        <h3>
                           Cachet et signature de l'administration
                        </h3>
                     </div>

                     <div className="right">
                        <h3>
                           Signature
                           <br />
                           du bénéficiaire
                        </h3>
                     </div>

                  </div>

                  <div className="footer">
                     NB. : Ce bon est valable uniquement à la date indiquée et n'est ni échangeable ni remboursable.
                  </div>

               </div>
            ));
         })}
      </>
   );
}

import { useEffect, useState } from "react";
import Axios from "axios";

export default function Statistiques() {

    const [stats, setStats] = useState(null);

    useEffect(() => {

        charger();

    }, []);

    const charger = async () => {

        try {

            const res = await Axios.get("http://localhost:5000/statistiques/dashboard");

            setStats(res.data);

        }

        catch (err) {

            console.log(err);

        }

    };

    if (!stats)

        return (
            <div className="container mt-5 text-center">

                Chargement...

            </div>
        );

    return (

        <div className="container mt-5">

            <h2 className="mb-4">

                📊 Tableau de bord

            </h2>

            <div className="row g-4">

                <Card titre="Aujourd'hui" data={stats.today} />

                <Card titre="Cette semaine" data={stats.week} />

                <Card titre="Ce mois" data={stats.month} />

                <Card titre="Cette année" data={stats.year} />

            </div>

            <div className="card mt-5 shadow">

                <div className="card-header bg-primary text-white">

                    Top 10 des bénéficiaires

                </div>

                <div className="card-body">

                    <table className="table table-striped">

                        <thead>

                            <tr>

                                <th>N°</th>

                                <th>Nom</th>

                                <th>Prénom</th>

                                <th>Total</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                stats.top10.map((p) => (

                                    <tr key={p.personneId}>

                                        <td>{p.personneId}</td>

                                        <td>{p.nom}</td>

                                        <td>{p.prenom}</td>

                                        <td>{p.total}</td>

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

function Card({ titre, data }) {

    return (

        <div className="col-md-3">

            <div className="card shadow h-100">

                <div className="card-header bg-dark text-white text-center">

                    {titre}

                </div>

                <div className="card-body text-center">

                    <h2>

                        {data.total}

                    </h2>

                    <hr />

                    <p>

                        🍽 Déjeuner : <strong>{data.déjeuner}</strong>

                    </p>

                    <p>

                        🌙 Dîner : <strong>{data.dîner}</strong>

                    </p>

                </div>

            </div>

        </div>

    );

}
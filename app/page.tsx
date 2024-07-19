import Image from "next/image";
import { Sidebar, Navbar, Wizard } from "../index";
import Graph from './Graph'
import Table from './Table'

export default function Home() {
    return (
        <main className="main websites-page">

           <Navbar title="websites" />


           <div className="row">
                <div className="col">
                    <h2 className="campaign-title display-2">all campaigns</h2>
                    <h4 className="description">Monitor metrics, check reports and review performance.</h4>
                </div>
                <Wizard />
            </div>

            <Graph/>
            <br />
            <br />
            <br />

        <Table/>
        </main>
    );
}

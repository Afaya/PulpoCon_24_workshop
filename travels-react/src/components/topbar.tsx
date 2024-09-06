import Image from "next/image";
import Link from "next/link";

export default function Topbar() {
  return (
    <>
      <main className="topbar">
      <Image
                src="/Pulpi-React.png"
                alt="Logo de React encima del pulpo de la pulpoConf"
                width="50"
                height="70"
              />

        <h1>Mi app de viajes</h1>

        <div className="topbar__menu">
        <Link href="/" className="topbar__menuOption">Home</Link>
        <Link href="/travels" className="topbar__menuOption">Travels List</Link>
        {/* <Link
            href={{
              pathname: '/travel-edit/[slug]',
              query: { slug: 0 },
            }}
          >
            Travel edit
          </Link> */}
        </div>
        
      </main>
    </>
  );
}

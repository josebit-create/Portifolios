import Image from "next/image";
import AboutImg1 from "../../../public/about-1.png";
import AboutImg2 from "../../../public/about-2.png";
import { Check, MapPin, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

export function About() {
  return (
    <section className="bg-[#fdf6ec] py-16">
      <div className="container px-4 mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className="relative"
            data-aos="fade-up-right"
            data-aos-delay="300"
          >
            <div className="relative w-full h-[400px] rounded-3xl overflow-hidden ">
              <Image
                src={AboutImg1}
                alt="Foto do cachorro"
                fill
                quality={100}
                priority
                className="object-cover hover:scale-110 duration-300"
              />
            </div>
            <div
              className="absolute w-40 h-40 right-4
              -bottom-8 rounded-lg border-4 overflow-hidden border-white"
            >
              <Image
                src={AboutImg2}
                alt="Foto do cachorro 2"
                fill
                quality={100}
                priority
              />
            </div>
          </div>
          <div
            className="space-y-6 mt-10"
            data-aos="fade-up-left"
            data-aos-delay="500"
          >
            <h2 className="text-4xl font-bold">SOBRE</h2>
            <p>
              Until one has an animal, a part of one's soul remains unawakened.
              We believe that pets are family members and deserve the best care
              and attention. We offer the best services to ensure the well-being
              and happiness of your four-legged friend.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <Check className="text-red-500" /> Aberto desde 2006.
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-red-500" /> Equipe com mais de 10
                veterinários.
              </li>
              <li className="flex items-center gap-2">
                <Check className="text-red-500" /> Qualidade é nossa prioridade.
              </li>
            </ul>
            <div className="flex gap-2">
              <a
                href="#"
                className="bg-[#e84c3d] text-white flex items-center justify-center w-fit gap-2 px-4 py-2 rounded-md"
              >
                <WhatsappLogo className="w-5 h-5 text-white " />
                Contato via WhatsApp
              </a>
              <a
                href="#"
                className=" text-black flex items-center justify-center w-fit gap-2 px-4 py-2 rounded-md"
              >
                Endereço da loja
                <MapPin className="w-5 h-5 text-black " />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

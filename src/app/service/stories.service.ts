import { Injectable } from '@angular/core';

export type StorySection = {
  title: string;
  content: string;
};

export type HeroStory = {
  title: string;
  heroDisplayName: string;
  tagline?: string;
  heroImageUrl?: string;
  paragraphs: string[];
  sections?: StorySection[];
};

@Injectable({
  providedIn: 'root'    
})
export class StoriesService {

  private readonly defaultStory: HeroStory = {
    title: 'Historia',
    heroDisplayName: 'Personaje',
    tagline: 'Seleccioná un personaje para ver su historia.',
    heroImageUrl: '',
    paragraphs: [
      'Todavía no hay una historia cargada para este personaje.',
      'Más adelante podés completar su origen, motivación y rasgos.'
    ],
    sections: []
  };

  private readonly stories: Record<string, HeroStory> = 
  {
    carnage: {
      title: 'Historia',
      heroDisplayName: 'Carnage',
      tagline: 'El caos como forma de arte.',
      heroImageUrl: 'assets/carnage-storie.jpg',
      paragraphs: [
        'Carnage es la simbiosis perfecta entre un simbionte y una mente sin freno.',
        'Donde Venom tiene códigos y Spider-Man límites, Carnage solo tiene impulso.',
        'Su presencia no es solo violencia: es un mensaje. Un recordatorio de que el control es una ilusión.'
      ],
      sections: [
        { title: 'Origen', content: 'Acá contás cómo nace Carnage (huésped, evento detonante, etc.).' },
        { title: 'Motivación', content: '¿Qué busca? ¿Por qué hace lo que hace?' },
        { title: 'Rasgos', content: 'Cruel, impredecible, creativo en combate, sin empatía.' }
      ]
    },

    venom: {
      title: 'Historia',
      heroDisplayName: 'Venom',
      tagline: 'Protector oscuro.',
      heroImageUrl: 'assets/venom-storie.png',
      paragraphs: [
        'Venom no es solo rabia: es vínculo.',
        'Un monstruo con código.'
      ],
      sections: [
        {
            title: 'Origen',
            content: 'Venom nace tras la unión inicial entre el simbionte y Spider-Man. Durante ese vínculo, el simbionte se benefició del cuerpo y las habilidades de Peter Parker, aprendiendo y adaptándose a su estilo. Tras ser rechazado por su antiguo huésped, el simbionte se une a Harry Osborn, donde la furia por el abandono, las habilidades adquiridas y el resentimiento de su nuevo huésped confluyen en el nacimiento de Venom.'
        },
        { title: 'Motivación', content: 'Por un lado, el simbionte sigue sus propios intereses, mezclados con el sufrimiento de Harry... esta tensión generan que las intenciones y acciones de Venom muchas veces sean extremadamente cuestionables, sobre todo cuando estas se ven influenciadas por las heridas emocionales de Harry y el instito alinigenia/animal del simbionte de subsistir.' },
        { title: 'Rasgos', content: ' impulsivo y feroz, guiado por un código propio. Conserva las habilidades aprendidas durante su unión con Spider-Man, pero las canaliza a través de una relación simbiótica inestable, donde el control oscila entre el huésped y el simbionte.' }
      ]
    },

dante: {
  title: 'Historia',
  heroDisplayName: 'Dante',
  tagline: 'Cazador de demonios.',
  heroImageUrl: 'assets/Dante.png',

  paragraphs: [
    'Dante es un cazador de demonios mitad humano y mitad demonio, heredero del poder del legendario Sparda y de la humanidad de su madre Eva.',
    'Su destino, marcado por la perdida de su madre a manos de un Demonio, lo empujo a abrir y administrar su negocio anti-demonios, Devil May Cry.'
  ],

  sections: [
    { title: 'Origen', content: 'Nació y creció en una mansión aislada ubicada en las afueras de Red Grave City' },
    { title: 'Motivación', content: 'Venganza y Trauma Familiar.'},
    { title: 'Rasgos', content: 'Dante encarna una dualidad controlada entre lo humano y lo demoníaco, utilizando el humor y el sarcasmo como armadura frente a un pasado marcado por la pérdida. Si bien rechaza la ambición al poder, se ve constantemente sometido a este dado que ha logrado superar el poder original de su padre tras fusionar de manera exitosa la espada Rebellion con la espada Sparda en Devil May Cry 5, desbloqueó su forma definitiva, el Sin Devil Trigger, consolidándose como uno de los seres más poderosos de su universo.' }
  ]},
  peter: {
    title: 'Historia',
    heroDisplayName: 'Peter',
    tagline: 'Spidy-Veteran',
    heroImageUrl: 'assets/peter-b-parker-Story.jpg',

    paragraphs: [
      'En Spider-Man: Into the Spider-Verse, Peter B. es un Peter Parker veterano, con alrededor de 38 años.',
      'Peter Benjamin Parker no es el Spider-Man “ideal” del canon clásico, sino una variación envejecida, desgastada, que ya vivió lo que otros Spider-Man recién están empezando a atravesar.',
      'Este Peter nos en enseña el resultado del abandono arbitrario o deliberado de su alter ego, Peter Parker.',
      'En algún momneto, este Peter decidio que su "deber" como Spider-Man pesaba más que su vida personal, lo que lo desencadeno en cuestiones como su divorcio con MJ y demas cuestiones de su vida privada.',
      'Sin embargo, tras atravesar su momento canónico, al ser teletransportado a la Tierra 42 y conocer a Miles Morales, Peter B. se ve confrontado con un punto de inflexión. El encuentro con Miles no le devuelve simplemente un propósito heroico, sino que reactiva en él un deseo largamente reprimido, su anhelo por convertirse en Padre y estar a la altura.'
    ],

    sections: [
      { title: 'Origen', content: 'Ciudad: Nueva York (New York City), Universo / Tierra: Earth-616B, Época: Mundo contemporáneo equivalente al siglo XXI' },
      { title: 'Motivación', content: 'Sus motivaciones, al igual que la gran mayoría de Spider Mans, está marcada por el deber y la responsabilidad del uso moral de sus poderes. No obstante, su futuro vinculo con Miles le reactivará nuevas motivaciones más personales de su propia vida privada.'},
      { title: 'Rasgos', content: 'Peter B Parker se caracteriza por su constante y sistematico cinisimo defensivo frente las adversidades que ha enfrentado durante toda su vida. Situaciones extremas, perdidas de seres queridos y el abandano de quien verdadera es, Peter Benjamin Parker.' }
    ]}
};

  getStory(heroKey: string): HeroStory {
    return this.stories[heroKey] ?? this.defaultStory;
  }
}

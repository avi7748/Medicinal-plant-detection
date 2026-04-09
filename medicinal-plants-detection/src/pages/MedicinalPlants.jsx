import { useState } from "react";

const plants = [
  {
    id: 1,
    name: "Aerva lanata",
    commonName: "Mountain Knotgrass / Pashanabheda",
    family: "Amaranthaceae",
    origin: "Tropical Asia & Africa",
    emoji: "🌿",
    color: "#4a7c59",
    description: [
      "Aerva lanata is a perennial herb that grows up to 1 meter tall, commonly found in tropical and subtropical regions across Asia and Africa.",
      "The plant features slender, woolly-white branches covered with small, ovate to elliptic leaves that have a slightly velvety texture due to dense hair coverage.",
      "Its flowers are tiny, whitish, and densely packed into spike-like cylindrical clusters, blooming throughout the year in warm climates.",
      "The plant thrives in open, dry, and disturbed habitats such as roadsides, waste grounds, and grasslands, often growing at altitudes up to 1800 meters.",
      "Aerva lanata has a rich history in Ayurvedic and Siddha medicine systems, where it is considered one of the most important herbs for urinary and renal health.",
      "The roots of this plant are particularly potent, containing bioactive compounds including flavonoids, alkaloids, saponins, and tannins.",
      "Scientific studies have validated its diuretic, anti-lithiatic (kidney stone-preventing), antimicrobial, and anti-inflammatory properties.",
      "The whole plant — roots, leaves, stems, and flowers — is used medicinally, often in the form of decoctions, juices, or powders.",
      "Its Sanskrit name 'Pashanabheda' literally means 'stone breaker', reflecting its long-established reputation for dissolving kidney and urinary bladder stones.",
      "The plant is also known for its hepatoprotective effects, helping to shield liver tissues from toxic damage.",
    ],
    uses: [
      "Used as a powerful diuretic to treat urinary tract infections and promote kidney health",
      "Applied in the treatment and prevention of kidney stones and bladder calculi",
      "Used to manage diabetes by reducing blood glucose levels",
      "Employed as an anti-inflammatory remedy for arthritis and joint pain",
      "Used to treat cough, bronchitis, and other respiratory conditions",
      "Applied externally to heal wounds, boils, and skin infections",
      "Used for liver protection and treatment of jaundice",
    ],
  },
  {
    id: 2,
    name: "Aloe vera",
    commonName: "Aloe / Ghrit Kumari",
    family: "Asphodelaceae",
    origin: "Arabian Peninsula",
    emoji: "🌵",
    color: "#6b8f47",
    description: [
      "Aloe vera is a succulent perennial plant with thick, fleshy, lance-shaped leaves that store a remarkable gel-like substance composed largely of water and bioactive compounds.",
      "Native to the Arabian Peninsula, it has been cultivated globally for centuries and naturalized throughout tropical and subtropical regions worldwide.",
      "The plant has no visible stem or a very short one, with leaves arranged in a rosette pattern and edged with soft teeth or serrations.",
      "Inside each leaf are two distinct layers: a clear, mucilaginous gel used medicinally, and a yellow latex layer found just below the outer skin.",
      "Aloe vera gel contains over 75 potentially active constituents including vitamins A, C, E, B12, enzymes, minerals, sugars, lignin, saponins, salicylic acids, and amino acids.",
      "The plant is regarded as one of the most thoroughly researched medicinal herbs in the world, with thousands of peer-reviewed studies confirming its diverse biological activities.",
      "It blooms with tubular yellow flowers borne on tall, erect spikes, though it rarely flowers when grown indoors.",
      "Aloe vera thrives in well-drained, sandy soil and is highly drought-resistant due to its water-storing leaf structure.",
      "Ancient Egyptians called it the 'Plant of Immortality' and used it extensively in burial rites and beauty preparations.",
      "It remains one of the most commercially valuable plants globally, with its extracts used in cosmetics, food supplements, pharmaceuticals, and beverages.",
    ],
    uses: [
      "Topically applied to soothe sunburns, minor burns, and skin irritations",
      "Used as a moisturizer and anti-aging treatment in skincare products",
      "Consumed internally to relieve constipation and improve digestive health",
      "Applied to promote wound healing and reduce scarring",
      "Used to manage blood sugar levels in type 2 diabetes",
      "Employed as a hair conditioner and scalp treatment for dandruff",
      "Used to treat cold sores, psoriasis, and other inflammatory skin conditions",
      "Applied in oral hygiene to reduce plaque and treat mouth ulcers",
    ],
  },
  {
    id: 3,
    name: "Andrographis paniculata",
    commonName: "King of Bitters / Kalmegh",
    family: "Acanthaceae",
    origin: "South Asia (India & Sri Lanka)",
    emoji: "🌱",
    color: "#2d6a4f",
    description: [
      "Andrographis paniculata is an erect annual herb growing up to 1 meter, widely distributed across South and Southeast Asia and now cultivated globally for its medicinal value.",
      "Commonly called the 'King of Bitters', the plant is named for its intensely bitter taste, attributed primarily to andrographolide, a diterpenoid lactone compound.",
      "The leaves are dark green, lance-shaped, and glabrous (smooth), while the stems are quadrangular with a slightly winged appearance.",
      "Its small white or pale pink flowers, marked with purple spots on the lower lip, form loose paniculate arrangements typical of the Acanthaceae family.",
      "Andrographolide — the primary bioactive compound — has been extensively studied for its anti-inflammatory, antiviral, antifungal, and anticancer properties.",
      "The plant has been a cornerstone of traditional medicine systems including Ayurveda, Traditional Chinese Medicine, and Thai herbal medicine for centuries.",
      "During the 1919 Spanish flu pandemic and more recently during COVID-19, it gained global attention for its potential antiviral efficacy.",
      "Scientific research has shown it modulates immune responses by stimulating the production of white blood cells and increasing interferon production.",
      "The plant has significant hepatoprotective properties and has been used traditionally to treat liver disorders and bile duct conditions.",
      "It is now cultivated commercially in India, China, and Thailand, with standardized extracts widely available as nutraceutical supplements.",
    ],
    uses: [
      "Used to treat colds, flu, and upper respiratory tract infections",
      "Employed as a liver tonic and treatment for hepatitis and jaundice",
      "Used to reduce fever and manage malaria symptoms",
      "Applied to treat digestive disorders including diarrhea and dysentery",
      "Used for its anti-inflammatory properties in managing arthritis",
      "Employed in cancer research for its anticancer and immunomodulatory effects",
      "Used to manage blood sugar levels in diabetic patients",
    ],
  },
  {
    id: 4,
    name: "Bacopa monnieri",
    commonName: "Brahmi / Water Hyssop",
    family: "Plantaginaceae",
    origin: "Wetlands of South and Southeast Asia",
    emoji: "🍀",
    color: "#52796f",
    description: [
      "Bacopa monnieri is a small, creeping, succulent herb that thrives in wet and marshy environments, commonly found along riverbanks, ponds, and flooded fields across tropical regions.",
      "The plant has small, oblong, fleshy leaves and tiny pale-purple or white flowers with four or five petals, blooming during the warmer months.",
      "Named after the Hindu god Brahma, the creator, it holds deep spiritual and medicinal significance in Indian cultural traditions dating back over 3,000 years.",
      "Its primary bioactive compounds are bacosides A and B — triterpenoid saponins — which are responsible for its remarkable nootropic and neuroprotective activities.",
      "Bacopa monnieri is one of the most rigorously studied herbs for cognitive enhancement, with multiple clinical trials demonstrating improvements in memory, learning, and information processing speed.",
      "The herb works by enhancing the transmission of nerve impulses through the kinase activity of neuronal proteins and promoting antioxidant protection in the brain.",
      "It has been used in Ayurvedic medicine for millennia, particularly described in the ancient text Charaka Samhita as a Medhya Rasayana — a class of herbs that promote intellect and memory.",
      "Modern research supports its anxiolytic (anti-anxiety) effects, as it modulates serotonin levels while simultaneously reducing cortisol, the stress hormone.",
      "The plant is also valued for its antiepileptic properties and has been used traditionally in managing epilepsy and neurodegenerative conditions.",
      "Bacopa monnieri grows well in waterlogged conditions and does not tolerate drought, distinguishing it ecologically from most other medicinal herbs.",
    ],
    uses: [
      "Used as a nootropic to enhance memory retention and cognitive function",
      "Employed to reduce anxiety, stress, and symptoms of depression",
      "Used in the treatment of epilepsy and seizure disorders",
      "Applied to improve attention span and concentration in ADHD",
      "Used to protect the brain from age-related neurodegeneration",
      "Employed as a treatment for insomnia and sleep disorders",
      "Used to manage symptoms of Alzheimer's and Parkinson's disease",
      "Applied to treat bronchitis and asthma as an expectorant",
    ],
  },
  {
    id: 5,
    name: "Calotropis gigantea",
    commonName: "Giant Milkweed / Madar",
    family: "Apocynaceae",
    origin: "South & Southeast Asia",
    emoji: "🌸",
    color: "#7b6d8d",
    description: [
      "Calotropis gigantea is a large shrub or small tree growing up to 4 meters tall, recognizable by its thick, corky stem and large, opposite, silvery-green leaves with a waxy, glaucous coating.",
      "The plant is native to South and Southeast Asia and is found throughout India, China, Pakistan, and neighboring countries, often thriving in arid, sandy, or disturbed lands.",
      "Its striking flowers are arranged in umbel-like clusters, each bloom featuring five pale-purple or white petals with a distinctive crown structure characteristic of the milkweed family.",
      "All parts of the plant exude a milky white latex when cut, which contains a complex mixture of cardenolides, alkaloids, and other toxic compounds that have both medicinal and hazardous properties.",
      "The plant is considered sacred in Hindu traditions and its flowers are offered to Lord Shiva during religious ceremonies.",
      "Calotropis contains potent bioactive constituents including calotropin, calactin, uscharin, and voruscharin — cardiac glycosides with significant pharmacological activity.",
      "Despite its toxicity in high doses, carefully prepared Ayurvedic formulations using this plant have been used to treat a wide range of chronic diseases.",
      "The plant plays an important ecological role, as its flowers provide nectar for monarch-type butterflies, and its fibrous stem bark is used for rope-making.",
      "Scientific studies confirm its analgesic, anti-inflammatory, antifungal, and antimicrobial activities, providing a biochemical basis for its traditional applications.",
      "In Siddha medicine, this plant is considered a 'rasayana' — a rejuvenating herb — and is used in complex formulations for skin diseases and chronic conditions.",
    ],
    uses: [
      "Used externally to treat skin diseases including leprosy, eczema, and psoriasis",
      "Applied as a pain reliever for toothache and joint inflammation",
      "Employed in the treatment of digestive disorders and constipation",
      "Used to treat respiratory conditions like asthma and bronchitis",
      "Applied as an antidote in traditional medicine for certain snake bites",
      "Used in wound healing and treatment of boils and abscesses",
      "Employed in Ayurvedic formulations for treating syphilis and other infections",
    ],
  },
  {
    id: 6,
    name: "Centella asiatica",
    commonName: "Gotu Kola / Mandukaparni",
    family: "Apiaceae",
    origin: "Wetlands of Asia & Africa",
    emoji: "🌿",
    color: "#3d8b6e",
    description: [
      "Centella asiatica is a slender, creeping herb with kidney-shaped or fan-shaped leaves, growing low to the ground in moist, tropical environments across Asia, Africa, and parts of Oceania.",
      "The leaves are bright green, smooth, and have a distinctive rounded shape with slightly scalloped margins, growing on thin, wiry petioles from stolons (horizontal stems).",
      "The plant produces tiny pinkish-red flowers in small, umbrella-like clusters (umbels) arising directly from the ground, characteristic of the Apiaceae family.",
      "It has been used for centuries in Ayurveda, Traditional Chinese Medicine, and Indonesian medicine systems as a herb of longevity, wound healing, and mental clarity.",
      "The key bioactive compounds are pentacyclic triterpenoids — primarily asiaticoside, asiatic acid, madecassoside, and madasiatic acid — which drive its pharmacological effects.",
      "Centella asiatica is scientifically recognized for its exceptional ability to stimulate collagen biosynthesis, making it invaluable in wound healing and anti-aging skincare formulations.",
      "It has neuroprotective effects and has been studied for its role in enhancing cognitive function, improving memory, and providing anxiolytic (anti-anxiety) benefits.",
      "The plant is widely found in rice paddies and along waterways, often considered a weed in agricultural settings but prized in herbal medicine circles.",
      "In Sri Lankan folklore, elephants — known for their exceptional longevity and memory — are believed to consume Gotu Kola regularly, contributing to the herb's reputation as a longevity tonic.",
      "Modern cosmetic science has embraced Centella asiatica extract (CICA) as a key ingredient in skincare products for its calming and regenerative properties.",
    ],
    uses: [
      "Used to accelerate wound healing and reduce scar formation",
      "Employed in skincare for anti-aging, collagen production, and skin barrier repair",
      "Used to improve memory, focus, and overall cognitive performance",
      "Applied to manage anxiety and promote mental calmness",
      "Used to treat varicose veins and improve blood circulation",
      "Employed in treating leprosy and chronic skin conditions",
      "Used as a diuretic and to support kidney function",
      "Applied to treat depression and neurodegenerative diseases",
    ],
  },
  {
    id: 7,
    name: "Chromolaena odorata",
    commonName: "Siam Weed / Devil Weed",
    family: "Asteraceae",
    origin: "Central & South America",
    emoji: "🌾",
    color: "#5c7a4e",
    description: [
      "Chromolaena odorata is a fast-growing, perennial shrub in the daisy family, introduced from its native Central and South American range to tropical Africa and Asia, where it has become a notorious invasive species.",
      "The plant grows aggressively, reaching up to 2.5 meters in height, with opposite, triangular to ovate leaves that are aromatic when crushed due to volatile essential oils.",
      "Its flowers are small, tubular, pale blue to white or lavender, arranged in dense, flat-topped clusters at the branch tips during the dry season.",
      "Despite its reputation as an agricultural weed, Chromolaena odorata has a surprisingly rich pharmacological profile that has attracted significant scientific interest.",
      "The leaves contain a variety of phytochemicals including flavonoids (quercetin, luteolin), terpenes, tannins, saponins, and alkaloids with documented biological activity.",
      "Traditional healers across West Africa, Southeast Asia, and the Pacific Islands have long used this plant to treat wounds, infections, and fever.",
      "Research has demonstrated that leaf extracts significantly accelerate wound healing by promoting the formation of new blood vessels and stimulating skin cell proliferation.",
      "Its antimicrobial properties have been validated against a range of bacterial and fungal pathogens, including antibiotic-resistant strains.",
      "The plant's ecological impact is severe — it outcompetes native vegetation, alters soil chemistry, and is a fire hazard due to its flammable dry biomass.",
      "Despite its invasiveness, researchers are exploring whether its rapid growth and medicinal properties can be harnessed sustainably for pharmaceutical production.",
    ],
    uses: [
      "Applied topically to stop bleeding from cuts and wounds (hemostatic effect)",
      "Used to treat bacterial and fungal skin infections",
      "Employed as a fever reducer (antipyretic) in traditional medicine",
      "Used as an anti-inflammatory agent for pain and swelling",
      "Applied to treat malaria in African traditional medicine",
      "Used to promote wound healing and prevent wound infections",
      "Employed as an insect repellent in some communities",
    ],
  },
  {
    id: 8,
    name: "Cissus quadrangularis",
    commonName: "Hadjod / Veldt Grape",
    family: "Vitaceae",
    origin: "Africa & Asia",
    emoji: "🦴",
    color: "#8a9a5b",
    description: [
      "Cissus quadrangularis is a perennial succulent vine or shrub in the grape family, notable for its distinctly quadrangular (four-angled) jointed stems that give it a striking segmented appearance.",
      "Each stem segment is green and photosynthetically active, with constrictions at each joint and small, simple leaves that may be shed during drought periods.",
      "The plant produces small, yellowish-green flowers and tiny red or black berries, with tendrils allowing it to climb over other vegetation.",
      "It is distributed widely across tropical Africa, the Arabian Peninsula, and South and Southeast Asia, where it grows in dry forests, scrublands, and along rocky hillsides.",
      "Known as 'Hadjod' in Sanskrit — literally meaning 'bone joiner' — it has been used in Ayurvedic medicine for over 2,000 years to accelerate fracture healing and strengthen bones.",
      "The plant contains a remarkable suite of bioactive compounds including ketosteroids, triterpenoids, flavonoids (quercetin, kaempferol), vitamin C, and stilbene derivatives.",
      "Modern clinical trials have confirmed its ability to significantly reduce fracture healing time, sometimes by as much as 55–60%, by promoting osteoblast activity and increasing bone mineral density.",
      "Cissus quadrangularis also has potent analgesic and anti-inflammatory properties, reducing pain associated with fractures, joint disorders, and musculoskeletal injuries.",
      "Interestingly, the plant has demonstrated significant weight management and metabolic benefits in clinical studies, reducing body fat, cholesterol, and blood sugar levels.",
      "Athletes and bodybuilders have adopted Cissus quadrangularis supplements for joint health, injury recovery, and lean muscle preservation.",
    ],
    uses: [
      "Used to accelerate bone fracture healing and strengthen bones",
      "Employed to treat osteoporosis and increase bone mineral density",
      "Used to relieve joint pain, arthritis, and musculoskeletal injuries",
      "Applied to manage obesity and metabolic syndrome",
      "Used to treat hemorrhoids and anal fissures",
      "Employed for digestive health, including ulcer treatment",
      "Used in sports medicine for injury recovery and joint protection",
      "Applied to manage menstrual disorders and pain",
    ],
  },
  {
    id: 9,
    name: "Clerodendrum infortunatum",
    commonName: "Bhat / Hill Glory Bower",
    family: "Lamiaceae",
    origin: "South & Southeast Asia",
    emoji: "🌺",
    color: "#6d4c7e",
    description: [
      "Clerodendrum infortunatum is a soft-wooded shrub growing up to 3 meters tall, distributed across tropical and subtropical regions of South and Southeast Asia, including India, Sri Lanka, and Malaysia.",
      "The plant has large, broadly ovate, opposite leaves with a slightly coarse texture and an unpleasant odor when crushed, which is responsible for part of its botanical name 'infortunatum' (unfortunate).",
      "Its flowers are spectacular — white or pale pink petals emerge from scarlet-red calyces in dense terminal clusters, giving it ornamental as well as medicinal value.",
      "The plant produces small, fleshy, blue-black or purplish-black fruits enclosed in the persistent, star-shaped red calyx, attracting birds and serving as an important wildlife plant.",
      "In Ayurvedic medicine, this plant is known as 'Bhandira' and is listed among important herbs for treating skin diseases, fever, and worm infestations.",
      "The leaves, roots, and bark contain a range of bioactive phytochemicals including clerodendrin, alkaloids, flavonoids, steroids, saponins, and phenolic compounds.",
      "Scientific research has confirmed significant antibacterial activity against pathogens like Staphylococcus aureus and Escherichia coli, validating its traditional use in wound care and infections.",
      "The plant has demonstrated hepatoprotective activity comparable to standard drugs in animal studies, supporting its traditional use in liver ailments.",
      "It plays a role in traditional tribal medicine across Odisha, Bengal, and Assam in India, where leaf pastes are applied to treat scabies and other parasitic skin infections.",
      "Phytochemical investigations reveal the presence of phenylethanoid glycosides and iridoid glycosides, contributing to its anti-inflammatory and immunomodulatory properties.",
    ],
    uses: [
      "Used to treat various skin diseases including scabies, ringworm, and eczema",
      "Employed as an antipyretic to reduce fever",
      "Used to treat intestinal worms and parasitic infections",
      "Applied to manage rheumatism and inflammatory conditions",
      "Used for liver protection and to treat jaundice",
      "Employed in treatment of bronchitis and asthma",
      "Used topically to heal wounds and treat skin eruptions",
    ],
  },
  {
    id: 10,
    name: "Clitoria ternatea",
    commonName: "Butterfly Pea / Aparajita",
    family: "Fabaceae",
    origin: "Tropical Asia",
    emoji: "💙",
    color: "#4361a0",
    description: [
      "Clitoria ternatea is a perennial herbaceous plant and twining vine belonging to the legume family, celebrated worldwide for its strikingly vivid, deep indigo-blue or violet flowers.",
      "The flowers have a distinctive shape resembling butterfly wings with a prominent white or yellow center, and the plant's blue pigmentation comes from a class of flavonoids called ternatins — polyacylated delphinidin glucosides.",
      "Native to tropical Asia, it is now widely cultivated globally as an ornamental plant, natural food colorant, and source of traditional and modern medicine.",
      "The plant has deep cultural significance in Southeast Asian countries; in Thailand and Vietnam, butterfly pea flower tea is a popular daily beverage known for its vivid blue color that turns purple-pink when lemon juice is added due to pH changes.",
      "In Ayurvedic medicine, Clitoria ternatea is called 'Aparajita' (meaning 'the undefeated one') and is used as a Medhya Rasayana — a brain and memory tonic.",
      "The roots, seeds, and flowers all have distinct medicinal properties; roots are used as cathartics and diuretics, seeds have purgative effects, and flowers are used as nootropics.",
      "Scientific research has identified significant antioxidant, nootropic, anxiolytic, antidepressant, anti-inflammatory, analgesic, and antidiabetic properties in various plant parts.",
      "The anthocyanin-rich extract has potent antioxidant capacity and shows promise in protecting against neurodegenerative diseases by reducing oxidative stress in brain cells.",
      "Clitoria ternatea is also a valuable nitrogen-fixing legume, enriching soil quality and making it ecologically important in agroforestry systems.",
      "Growing scientific interest has led to its inclusion in functional foods, beverages, cosmetics, and pharmaceutical products, reflecting its multidimensional value.",
    ],
    uses: [
      "Used as a nootropic to enhance memory and cognitive function",
      "Consumed as an herbal tea for relaxation, stress relief, and anxiety management",
      "Applied in hair care to promote hair growth and prevent premature graying",
      "Used as a natural food and beverage colorant",
      "Employed to treat eye conditions including conjunctivitis and retinal disorders",
      "Used as a mild laxative and diuretic",
      "Applied in skincare for anti-aging and skin hydration",
      "Used to manage blood sugar levels in diabetes",
    ],
  },
  {
    id: 11,
    name: "Coccinia grandis",
    commonName: "Ivy Gourd / Kunduru",
    family: "Cucurbitaceae",
    origin: "Africa & South Asia",
    emoji: "🥒",
    color: "#5a8a4a",
    description: [
      "Coccinia grandis is a fast-growing perennial climber in the cucumber family, producing bright red, oval fruits about 4–5 cm long when ripe, and green when unripe.",
      "The plant has heart-shaped, deeply lobed, dark green leaves on slender tendrils, and produces small, star-shaped white flowers with five petals.",
      "Native to Africa and widely naturalized across South and Southeast Asia, it grows vigorously in warm, tropical environments, climbing fences, trees, and other structures.",
      "Both the leaves and fruits are consumed as vegetables in many South and Southeast Asian cuisines, making it simultaneously a food plant and a medicinal herb.",
      "Coccinia grandis has been studied extensively for its antidiabetic properties; clinical studies have shown its ability to significantly reduce fasting blood glucose levels and improve glycated hemoglobin (HbA1c) values.",
      "The plant's hypoglycemic action is attributed to compounds like β-sitosterol, taraxerol, and cucurbitacins that enhance insulin sensitivity and inhibit glucose-metabolizing enzymes.",
      "Its antioxidant profile is robust, with leaves and fruits containing carotenoids, flavonoids, and phenolic acids that scavenge free radicals and reduce oxidative stress.",
      "Coccinia grandis has demonstrated significant hepatoprotective properties and is used traditionally to protect the liver from chemical-induced damage.",
      "The plant also shows lipid-lowering activity, helping reduce total cholesterol and triglyceride levels in diabetic and hyperlipidemic subjects.",
      "As an invasive species in Hawaii and parts of the Pacific Islands, it poses ecological challenges while simultaneously attracting pharmaceutical interest for its medicinal potential.",
    ],
    uses: [
      "Primarily used to manage type 2 diabetes and lower blood glucose",
      "Employed to reduce cholesterol and triglyceride levels",
      "Used as a liver tonic and hepatoprotective agent",
      "Applied to treat skin diseases like leprosy and psoriasis",
      "Used as an antioxidant to combat free radical damage",
      "Employed to treat urinary tract infections",
      "Consumed as a nutritious vegetable supporting overall health",
    ],
  },
  {
    id: 12,
    name: "Curcuma longa",
    commonName: "Turmeric / Haldi",
    family: "Zingiberaceae",
    origin: "South Asia (India)",
    emoji: "🟡",
    color: "#c9a227",
    description: [
      "Curcuma longa is a rhizomatous herbaceous perennial plant in the ginger family, producing large, oblong leaves and cone-shaped flower spikes with pale yellow flowers tinged with white or pink.",
      "The underground rhizome — which is the commercially important part — is bright orange-yellow inside, producing the vivid golden pigment that has made turmeric one of the world's most recognized spices and dyes.",
      "Turmeric has been cultivated in India for at least 4,000 years and is deeply embedded in Hindu culture, used in religious ceremonies, wedding rituals, and traditional medicine.",
      "The primary bioactive compound is curcumin, a polyphenol that constitutes about 2–5% of dried turmeric powder and is responsible for most of its extraordinary pharmacological activities.",
      "Curcumin is one of the most thoroughly researched natural compounds in the world, with over 12,000 published peer-reviewed studies documenting its anti-inflammatory, antioxidant, anticancer, neuroprotective, and cardioprotective effects.",
      "A significant challenge with curcumin is its low bioavailability when consumed orally; combining it with piperine (from black pepper) increases absorption by up to 2,000% — a synergy known in Ayurveda for millennia.",
      "Turmeric has been used in Ayurvedic, Chinese, and Middle Eastern traditional medicine systems for treating arthritis, digestive disorders, wounds, jaundice, and fevers.",
      "Modern clinical research is investigating curcumin's potential in preventing and treating Alzheimer's disease, various cancers, cardiovascular disease, and metabolic syndrome.",
      "India produces approximately 80% of the world's turmeric supply, primarily in the states of Andhra Pradesh, Tamil Nadu, and Odisha.",
      "Beyond medicine and cuisine, turmeric is used as a fabric dye, food colorant (E100), cosmetic ingredient, and in the production of traditional paints and artwork.",
    ],
    uses: [
      "Used as a potent anti-inflammatory agent for arthritis and joint pain",
      "Applied topically to wounds, burns, and skin conditions for healing and antimicrobial effects",
      "Used to support digestive health and treat irritable bowel syndrome",
      "Employed in cancer prevention research for its anticancer properties",
      "Used to protect the liver from toxic damage and improve liver function",
      "Applied in skincare for brightening, anti-aging, and acne treatment",
      "Used to manage blood sugar in diabetic patients",
      "Employed to support cardiovascular health and reduce cholesterol",
      "Used in neurological health to prevent dementia and Alzheimer's disease",
    ],
  },
  {
    id: 13,
    name: "Datura metel linn",
    commonName: "Devil's Trumpet / Dhatura",
    family: "Solanaceae",
    origin: "South Asia & Central America",
    emoji: "🔔",
    color: "#8b5e8a",
    description: [
      "Datura metel is a robust annual or short-lived perennial herb growing up to 1.5 meters, known for its large, trumpet-shaped flowers that can be white, purple, or yellow depending on the variety.",
      "The plant has large, soft, ovate leaves with wavy margins, often with a fetid or unpleasant odor, and produces distinctive spiny, globe-shaped seed capsules that split open to release numerous seeds.",
      "Datura metel contains highly toxic tropane alkaloids — primarily scopolamine, hyoscine, hyoscyamine, and atropine — distributed throughout all parts of the plant, making it one of the world's most dangerous medicinal herbs.",
      "Despite its extreme toxicity, it has been used carefully in traditional medicine systems across Asia, Africa, and the Americas for centuries, with dosage being the critical difference between medicine and poison.",
      "In Hindu mythology, Dhatura holds special significance — it is associated with Lord Shiva and is offered in religious worship, symbolizing the destructive and transformative aspects of the divine.",
      "The alkaloids in Datura have genuine pharmaceutical value: scopolamine is used in modern medicine for motion sickness, nausea, and pre-operative sedation, and atropine is a critical drug in cardiac emergencies.",
      "Historically, the plant was used by various cultures as an anesthetic for surgical procedures and as a hallucinogen in shamanic rituals.",
      "Datura's tropane alkaloids act on the parasympathetic nervous system by blocking muscarinic acetylcholine receptors, producing anticholinergic effects including dilation of pupils, dry mouth, and altered consciousness.",
      "The plant is now classified as a controlled substance in several countries due to its potential for misuse and accidental poisoning, yet it remains a subject of important pharmaceutical research.",
      "In Ayurveda and Unani medicine, highly purified and detoxified preparations of Datura are used under strict medical supervision to treat asthma, joint pain, and neurological conditions.",
    ],
    uses: [
      "Used in highly controlled preparations to treat asthma and bronchial spasms",
      "Applied topically (with caution) for pain relief in arthritis and neuralgia",
      "Scopolamine derived from Datura is used medically for motion sickness and pre-surgical sedation",
      "Atropine (derived from Datura family) is a life-saving drug in cardiac emergencies",
      "Used in Ayurvedic preparations for skin diseases and inflammation",
      "Applied in treatment of Parkinson's disease symptoms in traditional systems",
      "Used as an antispasmodic in treating whooping cough",
    ],
  },
  {
    id: 14,
    name: "Desmodium gangeticum",
    commonName: "Shalparni / Tick Trefoil",
    family: "Fabaceae",
    origin: "Tropical Asia & Africa",
    emoji: "🌿",
    color: "#4a7856",
    description: [
      "Desmodium gangeticum is a woody-based perennial herb or undershrub reaching up to 1.2 meters in height, widespread across tropical Asia, Africa, and Australia.",
      "The plant has trifoliate leaves (three leaflets), small pinkish-purple flowers in racemes, and distinctive curved seed pods that cling to clothing and animal fur — a characteristic that gives it the common name 'tick trefoil'.",
      "Known as 'Shalparni' in Sanskrit, it holds the distinction of being one of the 'Dashamula' — the ten roots — a classical Ayurvedic formulation of great historical and therapeutic importance.",
      "Dashamula is one of the most prescribed classical Ayurvedic combinations, used for treating respiratory diseases, neuromuscular conditions, and as a general tonic and adaptogen.",
      "The plant's roots and leaves contain a wealth of bioactive compounds including alkaloids (D-tryptophan, hordenine, salsoline, salsolinol), flavonoids, phenylpropanoids, and pterocarpanoids.",
      "Research has validated significant bronchodilatory effects of Desmodium gangeticum extracts, supporting its traditional application in asthma and chronic obstructive pulmonary disease.",
      "The plant demonstrates notable antioxidant, anti-inflammatory, and immunomodulatory activities, providing a pharmacological basis for its tonic properties in Ayurvedic medicine.",
      "Scientific studies have identified promising anticancer properties, with extracts showing cytotoxic activity against several human cancer cell lines.",
      "As a legume, Desmodium gangeticum is also a valuable nitrogen-fixing plant that improves soil fertility, making it ecologically and agriculturally important.",
      "Traditional healers across India, Sri Lanka, and Southeast Asia use this plant for treating fever, rheumatism, diarrhea, and as a general health restorative.",
    ],
    uses: [
      "Used as a key component of the classical Dashamula formulation for respiratory and neurological conditions",
      "Employed to treat asthma, bronchitis, and respiratory infections",
      "Used as a general tonic and adaptogen to build immunity and vitality",
      "Applied to treat fever, diarrhea, and dysentery",
      "Used to manage rheumatism and musculoskeletal pain",
      "Employed to treat urinary disorders and kidney inflammation",
      "Used as a nervine tonic for conditions like paralysis and neuromuscular weakness",
    ],
  },
  {
    id: 15,
    name: "Hemigraphis colorata",
    commonName: "Purple Waffle Plant / Red Flame Ivy",
    family: "Acanthaceae",
    origin: "Southeast Asia",
    emoji: "🟣",
    color: "#6d3d8a",
    description: [
      "Hemigraphis colorata is a low-growing, spreading perennial herb known for its stunning metallic purple-green foliage on the upper surface and deep reddish-purple undersides.",
      "The leaves have a distinctive waffle-like texture — deeply corrugated and puckered — which gives the plant its common name 'Purple Waffle Plant'.",
      "Native to Southeast Asia, particularly Java (Indonesia), it is widely cultivated as an ornamental plant in tropical and subtropical gardens and as an indoor houseplant worldwide.",
      "The plant produces small, tubular white flowers, though it is primarily grown for its dramatic foliage rather than its blooms.",
      "In traditional medicine systems of Southeast Asia and South Asia, Hemigraphis colorata has been used to treat a variety of dermatological and metabolic conditions.",
      "Phytochemical analysis has revealed the presence of flavonoids, alkaloids, tannins, saponins, steroids, and phenolic compounds in the leaves — compounds associated with diverse pharmacological activities.",
      "Scientific studies have demonstrated significant antimicrobial activity against a range of bacterial pathogens, as well as antifungal and anti-inflammatory properties.",
      "The plant has shown hepatoprotective effects in experimental models, suggesting potential value in liver disease management.",
      "Research has also documented antidiabetic properties, with leaf extracts reducing blood glucose levels and improving insulin sensitivity in experimental models.",
      "Hemigraphis colorata is one of the few ornamental plants with well-documented medicinal properties, bridging the gap between horticultural and ethnobotanical value.",
    ],
    uses: [
      "Used to treat skin diseases, wounds, and dermatological infections",
      "Employed as an antimicrobial agent against bacterial and fungal infections",
      "Used to manage diabetes and blood glucose levels",
      "Applied for liver protection and hepatic disease management",
      "Used as an anti-inflammatory agent for pain and swelling",
      "Employed in traditional remedies for digestive disorders",
      "Used topically to promote wound healing and reduce inflammation",
    ],
  },
  {
    id: 16,
    name: "Kaempferia galanga linn",
    commonName: "Kencur / Sand Ginger",
    family: "Zingiberaceae",
    origin: "South & Southeast Asia",
    emoji: "🫚",
    color: "#b8860b",
    description: [
      "Kaempferia galanga, commonly known as Kencur or Sand Ginger, is a small rhizomatous herb in the ginger family, growing close to the ground with broad, spreading, nearly stemless leaves.",
      "The leaves are flat, oval-shaped, and often lie nearly horizontal on the ground, with a smooth surface and an aromatic, peppery-camphoraceous scent when crushed.",
      "The plant produces delicate white flowers with a purple center that emerge directly from the ground between the leaves, making it appear almost stalkless.",
      "Its aromatic rhizome is the primary medicinal part — light brown on the outside and white inside — with a strong, distinctive fragrance due to its rich essential oil content.",
      "Kaempferia galanga is native to South and Southeast Asia and is widely used as a spice in Indonesian, Thai, and Malay cuisines, especially in traditional 'jamu' herbal drinks of Java.",
      "The essential oil of the rhizome contains ethyl trans-cinnamate, ethyl p-methoxycinnamate, pentadecane, and carvone — compounds responsible for its biological activities and characteristic aroma.",
      "Scientific research has documented significant anticancer properties, with ethyl p-methoxycinnamate showing cytotoxic activity against multiple human cancer cell lines.",
      "The plant has strong antimicrobial activity against respiratory pathogens, supporting its traditional use as a remedy for coughs, colds, and throat infections.",
      "Kaempferia galanga has been traditionally used in Jamu (Javanese herbal medicine) as a tonic, appetite stimulant, and treatment for rheumatism, muscle pain, and skin diseases.",
      "Modern research has validated its analgesic, anti-inflammatory, antioxidant, and larvicidal properties, indicating broad pharmaceutical potential beyond traditional applications.",
    ],
    uses: [
      "Used to treat coughs, colds, and respiratory infections",
      "Employed as an analgesic for headaches, body pain, and rheumatism",
      "Applied topically to treat skin diseases and fungal infections",
      "Used as an appetite stimulant and digestive tonic",
      "Employed in aromatherapy for relaxation and muscle pain relief",
      "Used in anti-cancer research due to its cytotoxic properties",
      "Applied as an insect repellent and larvicidal agent",
      "Used in traditional Jamu formulations for overall health and vitality",
    ],
  },
  {
    id: 17,
    name: "Mentha spicata",
    commonName: "Spearmint / Pudina",
    family: "Lamiaceae",
    origin: "Europe & Southwest Asia",
    emoji: "🌿",
    color: "#2e8b57",
    description: [
      "Mentha spicata is a fast-growing, aromatic, rhizomatous perennial herb in the mint family, producing upright, square stems with lance-shaped, serrated, bright green leaves.",
      "Unlike peppermint (Mentha × piperita), spearmint's characteristic fragrance is gentler and sweeter, primarily due to its chief active compound L-carvone rather than menthol.",
      "The plant produces long, slender spikes of tiny pink, pale purple, or white flowers during summer months, which are highly attractive to bees, butterflies, and other pollinators.",
      "Native to Europe and Southwest Asia, spearmint has been cultivated globally for culinary, cosmetic, and medicinal purposes for over 2,000 years.",
      "It spreads vigorously through underground stolons and can become invasive in garden settings, requiring containment to prevent overgrowth.",
      "The essential oil of spearmint contains L-carvone, limonene, myrcene, eucalyptol, and numerous other volatile compounds responsible for its diverse biological activities.",
      "Spearmint has well-documented antifungal, antibacterial, antiviral, and antioxidant properties, with the essential oil being particularly effective against oral pathogens.",
      "Interestingly, spearmint tea has gained clinical support for reducing androgen levels in women, making it a natural approach to managing polycystic ovary syndrome (PCOS) and hirsutism.",
      "In traditional Ayurvedic medicine, spearmint is used as a carminative, digestive, and cooling agent, often combined with other herbs in formulations for digestive disorders.",
      "Spearmint is one of the most widely consumed herbal teas globally and is extensively used in toothpastes, mouthwashes, confectionery, and the cosmetics industry.",
    ],
    uses: [
      "Used to treat digestive disorders including bloating, gas, nausea, and indigestion",
      "Employed as an antispasmodic to relieve irritable bowel syndrome symptoms",
      "Used to reduce androgen levels in PCOS and manage hirsutism in women",
      "Applied in oral hygiene products for antibacterial and breath-freshening effects",
      "Used to relieve headaches and migraines through topical application",
      "Employed as a mild analgesic and anti-inflammatory agent",
      "Used to treat coughs, colds, and respiratory congestion",
      "Applied topically to treat fungal infections and skin irritations",
    ],
  },
  {
    id: 18,
    name: "Ocimum gratissimum",
    commonName: "African Basil / Clove Basil",
    family: "Lamiaceae",
    origin: "Tropical Africa & Asia",
    emoji: "🌿",
    color: "#3a7d44",
    description: [
      "Ocimum gratissimum, known as African basil or clove basil, is a woody-based perennial herb or shrub growing up to 1.5 meters, closely related to but distinct from common sweet basil.",
      "The plant has large, ovate-lanceolate leaves with serrated margins, both the leaves and stems being densely aromatic due to abundant essential oil-containing glands.",
      "Its flower spikes bear small white or pale yellowish flowers arranged in whorls, and the entire plant emits a strong, clove-like scent due to its high eugenol content.",
      "Native to tropical Africa and parts of Asia, it has naturalized throughout tropical regions worldwide and is widely used in traditional medicine across Africa and South America.",
      "The essential oil of Ocimum gratissimum is rich in thymol, eugenol, carvacrol, linalool, and terpene hydrocarbons — compounds with well-established pharmacological activities.",
      "Scientific research has comprehensively validated its antibacterial activity against a wide spectrum of pathogens, including clinical isolates of Escherichia coli, Staphylococcus aureus, and Salmonella species.",
      "The plant has demonstrated strong antifungal activity, particularly against Candida species, making it a natural candidate for treating candidiasis and dermatophytic infections.",
      "In West African traditional medicine, Ocimum gratissimum is one of the most frequently cited medicinal plants, used for fever, diarrhea, wound care, and respiratory infections.",
      "Research has also documented significant antidiabetic, antioxidant, and anti-inflammatory activities, broadening its pharmaceutical potential beyond antimicrobial applications.",
      "The plant is also used in food preservation due to its antimicrobial volatile compounds and is cultivated as a condiment herb in many tropical African countries.",
    ],
    uses: [
      "Used to treat diarrhea, dysentery, and gastrointestinal infections",
      "Employed as an antimicrobial agent against bacterial and fungal infections",
      "Applied to treat fever and manage malaria symptoms in African traditional medicine",
      "Used for wound care and prevention of wound infections",
      "Employed to treat skin diseases including ringworm and candidiasis",
      "Used to manage blood sugar levels in diabetes",
      "Applied as a food preservative due to antimicrobial volatile oils",
      "Used to treat headaches and body pain",
    ],
  },
  {
    id: 19,
    name: "Ocimum tenuiflorum",
    commonName: "Holy Basil / Tulsi",
    family: "Lamiaceae",
    origin: "Indian Subcontinent",
    emoji: "🪴",
    color: "#1a6b42",
    description: [
      "Ocimum tenuiflorum, universally known as Tulsi or Holy Basil, is perhaps the most sacred plant in the Hindu tradition, worshipped as a goddess and kept in the courtyard of virtually every Hindu home.",
      "The plant is a bushy, branched, aromatic perennial herb reaching 30–60 cm in height, with purple-tinged or green stems, ovate to oblong leaves, and small purple or white flowers in dense spikes.",
      "Two primary varieties are cultivated: Rama Tulsi (green leaves) and Krishna Tulsi (purple-tinged leaves), each with slightly different phytochemical profiles and medicinal properties.",
      "Tulsi has been described in ancient Vedic texts as 'The Incomparable One' and is classified in Ayurveda as a premier Rasayana — a herb that promotes longevity, health, and spiritual clarity.",
      "The plant contains a rich array of bioactive compounds including eugenol, rosmarinic acid, ursolic acid, ocimumosides, oleanolic acid, linalool, and a variety of flavonoids and terpenes.",
      "Tulsi is one of the most extensively researched medicinal plants globally, with scientific studies confirming its adaptogenic, anti-inflammatory, antioxidant, immunomodulatory, antidiabetic, and antimicrobial properties.",
      "As an adaptogen, Tulsi helps the body cope with physical, chemical, and metabolic stress, modulating cortisol levels and supporting the hypothalamic-pituitary-adrenal (HPA) axis.",
      "Clinical trials have demonstrated that Tulsi consumption significantly improves cognitive function, reduces blood glucose levels, lowers blood pressure, and improves lipid profiles.",
      "The plant has been used for over 3,000 years in Ayurvedic medicine for a remarkable range of conditions, from the common cold and asthma to chronic diseases and mental health disorders.",
      "Modern research has identified its potential in cancer prevention, particularly through its ability to protect against chemical carcinogen-induced cancers and stimulate natural killer cell activity.",
    ],
    uses: [
      "Used as a premier adaptogen to combat physical and mental stress",
      "Employed to treat colds, coughs, flu, and respiratory infections",
      "Used to manage type 2 diabetes and improve insulin sensitivity",
      "Applied to enhance immune function and fight infections",
      "Used to reduce inflammation and treat arthritis and joint disorders",
      "Employed to support heart health and manage blood pressure and cholesterol",
      "Used to treat fever, particularly as part of respiratory illness management",
      "Applied in skin and oral care for its antibacterial and antifungal properties",
      "Used in cancer prevention research for its chemoprotective effects",
    ],
  },
  {
    id: 20,
    name: "Oxalis corniculata",
    commonName: "Creeping Wood Sorrel / Amrul",
    family: "Oxalidaceae",
    origin: "Widespread Pantropical",
    emoji: "🍀",
    color: "#5c8a3c",
    description: [
      "Oxalis corniculata is a delicate, creeping annual or perennial herb found virtually worldwide, thriving in disturbed areas, garden beds, lawns, roadsides, and even pavement cracks.",
      "The plant bears trifoliate, clover-like leaves that are often purplish-green in the sun, with characteristic drooping movement at night and in adverse conditions — a phenomenon called nyctinasty.",
      "Its tiny, bright yellow flowers with five petals are produced throughout the year in warm climates, followed by slender, cylindrical seed pods that explosively eject seeds when ripe.",
      "The distinctive sour taste of the leaves is due to a high content of oxalic acid and oxalates — compounds that should be consumed in moderation due to their potential to interfere with calcium absorption.",
      "Despite its modest appearance, Oxalis corniculata has a rich medicinal history across Ayurvedic, Chinese, African, and Latin American traditional medicine systems.",
      "The plant contains flavonoids (vitexin, isovitexin), phenolic acids, tannins, vitamin C, and various organic acids that contribute to its biological activities.",
      "Scientific research has documented antimicrobial, antifungal, antioxidant, anti-inflammatory, and wound-healing properties in extracts of Oxalis corniculata.",
      "In Ayurveda, it is known as 'Changeri' and is used as a digestive herb that stimulates appetite and improves liver function.",
      "The plant has shown hypoglycemic effects in experimental studies, suggesting potential utility in diabetes management.",
      "In traditional tribal medicine across India, leaf juice is frequently applied to skin conditions, insect bites, and eye inflammation, reflecting its versatile topical applications.",
    ],
    uses: [
      "Used to stimulate digestion and treat loss of appetite",
      "Applied to treat diarrhea, dysentery, and digestive disorders",
      "Used topically to treat skin diseases, insect bites, and wound infections",
      "Employed as an antipyretic to reduce fever",
      "Used to treat scurvy due to its vitamin C content",
      "Applied to treat conjunctivitis and other eye inflammations",
      "Used as an antifungal agent against ringworm and other skin fungi",
    ],
  },
  {
    id: 21,
    name: "Peperomia pellucida",
    commonName: "Shiny Bush / Clearweed",
    family: "Piperaceae",
    origin: "Tropical Americas",
    emoji: "🌱",
    color: "#4d8a6e",
    description: [
      "Peperomia pellucida is a small, succulent-like annual herb growing to about 40 cm, with heart-shaped, translucent (pellucid) leaves that appear almost glass-like when held to light — a feature that gives it its species name.",
      "The plant has fleshy, jointed stems and produces tiny, inconspicuous flowers arranged on slender, rat-tail-like spikes (spadices), typical of the pepper family.",
      "Native to tropical America, it has spread globally as a pantropical weed and is found growing in moist, shaded environments including wall crevices, garden beds, and forest understories.",
      "Despite being considered a weed, Peperomia pellucida is increasingly recognized as a nutritious edible plant consumed as a salad vegetable in Brazil, Peru, and parts of Southeast Asia.",
      "In Filipino traditional medicine, it is called 'ulasimang bato' and is one of the most widely used herbal remedies for treating arthritis and gout, officially included in the Philippine government's list of traditional herbal medicines.",
      "The plant contains a rich complement of bioactive compounds including flavonoids, alkaloids, apigenin, pellucidatin, β-sitosterol, and essential oils with notable pharmacological activities.",
      "Scientific research has confirmed significant anti-inflammatory and analgesic properties, with extracts showing efficacy comparable to standard anti-inflammatory drugs in experimental models.",
      "Antifungal activity has been documented against Candida species and dermatophytes, supporting its traditional use in treating skin fungal infections.",
      "Antimicrobial studies have shown broad-spectrum activity against gram-positive and gram-negative bacteria, including foodborne pathogens.",
      "Growing interest in Peperomia pellucida as a functional food and nutraceutical has led to increased research into its safety profile, nutritional composition, and mechanisms of action.",
    ],
    uses: [
      "Used to treat arthritis and gout (officially recognized in Philippine traditional medicine)",
      "Employed as an anti-inflammatory and pain reliever for musculoskeletal conditions",
      "Applied to treat skin infections, boils, and fungal conditions",
      "Used to manage fever and infections",
      "Consumed as a nutritious vegetable and salad herb",
      "Employed to treat abdominal pain and digestive disorders",
      "Used topically for wound healing and reducing skin inflammation",
    ],
  },
  {
    id: 22,
    name: "Phyllanthus niruri",
    commonName: "Stonebreaker / Bhumyamalaki",
    family: "Phyllanthaceae",
    origin: "Tropical Americas & Asia",
    emoji: "💧",
    color: "#3d7a6b",
    description: [
      "Phyllanthus niruri is a slender, upright annual herb growing 10–70 cm tall, with delicate, alternate feather-like leaves that resemble compound leaves but are actually simple leaves on flattened branchlets.",
      "The plant produces tiny, inconspicuous, greenish-yellow flowers in the leaf axils along the undersides of its branches, followed by small, spherical, seed-like fruits.",
      "Widely distributed across tropical and subtropical regions worldwide, it grows as a weed in disturbed soils, gardens, cultivated fields, and open land.",
      "Known in Portuguese as 'Quebra Pedra' (stone breaker) and in Sanskrit as 'Bhumyamalaki', it is celebrated across cultures for its remarkable ability to dissolve kidney and gallbladder stones.",
      "The plant contains an impressive array of bioactive compounds including phyllanthin, hypophyllanthin, niranthin, phyltetralin, geraniin, corilagin, ellagic acid, rutin, and quercetin.",
      "Phyllanthus niruri has been extensively researched for its antiviral properties, particularly against hepatitis B virus (HBV), with clinical studies showing significant reduction in viral load and improved liver function.",
      "Its anti-lithiatic (stone-dissolving) properties have been validated in clinical trials, demonstrating effectiveness in reducing the size and number of kidney stones and inhibiting calcium oxalate crystal aggregation.",
      "The plant demonstrates outstanding hepatoprotective activity, protecting liver cells from chemical and viral damage, and is used in standardized herbal formulations for liver disease.",
      "Scientific research has also documented antidiabetic, diuretic, anti-inflammatory, antioxidant, and analgesic properties, reflecting its broad pharmacological spectrum.",
      "Its antiviral efficacy extends beyond HBV to include activity against HIV, herpes viruses, and other RNA and DNA viruses, placing it among the most valuable antiviral plants in herbal medicine.",
    ],
    uses: [
      "Used to dissolve and prevent kidney and gallbladder stones",
      "Employed as an antiviral agent against hepatitis B and liver infections",
      "Used to protect and restore liver function in hepatitis and jaundice",
      "Applied as a diuretic to treat urinary tract infections",
      "Used to manage blood sugar in diabetes",
      "Employed as an antioxidant and anti-inflammatory agent",
      "Used in HIV/AIDS supportive therapy for its antiviral properties",
      "Applied to treat malaria and other febrile conditions",
    ],
  },
  {
    id: 23,
    name: "Piper betle",
    commonName: "Betel Leaf / Nagaballi",
    family: "Piperaceae",
    origin: "South & Southeast Asia",
    emoji: "🍃",
    color: "#2d6645",
    description: [
      "Piper betle is a perennial, aromatic, dioecious climbing vine with heart-shaped, glossy, deep-green leaves that have a characteristic peppery, slightly bitter taste and strong fragrance.",
      "The plant is native to South and Southeast Asia and has been cultivated for thousands of years, primarily for its leaves used in the cultural practice of betel chewing — one of the oldest and most widespread social customs in Asia.",
      "Betel chewing, which typically involves wrapping areca nut, slaked lime, and various spices in a betel leaf (called 'paan'), is practiced by an estimated 600 million people worldwide.",
      "The leaves contain phenylpropanoids — primarily hydroxychavicol, chavibetol, estragole, and eugenol — which give the leaf its distinctive taste, aroma, and significant antimicrobial properties.",
      "Piper betle has a long history in Ayurvedic, Siddha, and traditional Southeast Asian medicine, used for digestive stimulation, wound healing, oral hygiene, and treatment of various ailments.",
      "The essential oil and leaf extracts demonstrate potent antibacterial activity against oral pathogens including Streptococcus mutans and Candida albicans, supporting their traditional use in oral hygiene.",
      "Scientific research has documented anti-inflammatory, antioxidant, analgesic, and wound-healing properties, with hydroxychavicol identified as a key contributor to most pharmacological activities.",
      "Betel leaves have been used as a natural food preservative and are being studied for food packaging applications due to their antimicrobial volatile compounds.",
      "The plant is a significant cultural symbol in marriage ceremonies, religious rituals, and hospitality customs across Bangladesh, India, Sri Lanka, Thailand, Vietnam, and the Philippines.",
      "While betel leaves themselves are generally considered safe, the combination with areca nut (which is carcinogenic) and tobacco in traditional betel quid creates significant health risks, including oral cancer.",
    ],
    uses: [
      "Used to stimulate digestion and relieve flatulence and constipation",
      "Employed in oral hygiene to prevent cavities and freshen breath",
      "Applied to wounds as an antibacterial dressing to promote healing",
      "Used to treat coughs, bronchitis, and chest congestion",
      "Employed as an analgesic for headaches and joint pain",
      "Used to treat fungal infections, particularly candidiasis",
      "Applied to treat conjunctivitis and ear infections traditionally",
      "Used as a food preservative due to antimicrobial essential oils",
    ],
  },
  {
    id: 24,
    name: "Piper longum",
    commonName: "Long Pepper / Pippali",
    family: "Piperaceae",
    origin: "South Asia (India)",
    emoji: "🌶️",
    color: "#8b3a3a",
    description: [
      "Piper longum, known as Long Pepper or Pippali in Ayurveda, is a climbing aromatic perennial vine with heart-shaped, smooth, alternate leaves and small flowers densely arranged on elongated, cylindrical spikes.",
      "The fruit is the familiar long pepper — a dense spike of tiny berries fused into an elongated structure, initially green and turning dark when dried — with a more complex, warmer, and deeper heat profile than black pepper.",
      "Native to the Indian subcontinent and cultivated across South and Southeast Asia, Piper longum was one of the most traded spices in the ancient world, preceding black pepper in European trade routes.",
      "The plant contains piperine (the primary alkaloid), piperlonguminine, piplartine, pipernonaline, and various volatile oils — compounds responsible for both its culinary pungency and medicinal potency.",
      "Pippali holds a special and unique place in Ayurvedic pharmacology as one of the three ingredients of 'Trikatu' (Three Pungents) along with black pepper and ginger — a foundational formulation for digestive fire and bioavailability enhancement.",
      "Piperine, the chief alkaloid, is a documented bioavailability enhancer (bioperine) that significantly increases the intestinal absorption of many nutrients and pharmaceutical compounds, including curcumin and several drugs.",
      "In Ayurveda, Pippali is classified as a Rasayana (rejuvenating herb) and is especially indicated for conditions affecting the lungs, liver, and digestive system.",
      "Scientific research has validated significant hepatoprotective, antiulcer, antitumor, immunomodulatory, anti-inflammatory, and antifungal properties of Piper longum extracts.",
      "The plant's anti-platelet aggregation and vasodilatory properties make it a subject of cardiovascular research, particularly for its potential role in managing thrombosis and hypertension.",
      "Traditional uses span managing asthma, cough, epilepsy, pain, and liver disorders — a remarkably diverse therapeutic range supported by growing pharmacological evidence.",
    ],
    uses: [
      "Used to enhance digestive capacity and treat digestive disorders",
      "Employed to treat asthma, cough, and chronic respiratory conditions",
      "Used as a bioavailability enhancer for nutrients and pharmaceuticals",
      "Applied as a liver tonic and hepatoprotective agent",
      "Used in Trikatu formulation for metabolic stimulation and weight management",
      "Employed to treat neurological disorders including epilepsy",
      "Used for its anti-inflammatory effects in arthritis and pain management",
      "Applied in cancer research for its antitumor properties",
    ],
  },
  {
    id: 25,
    name: "Piper nigrum",
    commonName: "Black Pepper / Kali Mirchi",
    family: "Piperaceae",
    origin: "Kerala, India",
    emoji: "⚫",
    color: "#3a3a3a",
    description: [
      "Piper nigrum is a flowering vine native to the Malabar Coast of Kerala, India, and is the world's most widely traded and consumed spice, accounting for approximately 20% of global spice trade.",
      "The plant is a woody, climbing perennial vine that uses aerial roots to attach itself to support trees, reaching heights of 4–10 meters, with broad, ovate leaves and slender flower spikes.",
      "Black, white, green, and red peppercorns are all derived from the same plant, harvested at different stages of ripeness and processed differently, yielding distinct flavors and bioactive profiles.",
      "The primary bioactive compound is piperine — an alkaloid that constitutes 2–9% of the fruit — along with chavicine (the cis-isomer), piperidine, volatile essential oils, and starch.",
      "Piperine is one of the most scientifically studied natural bioavailability enhancers, increasing the absorption of curcumin by up to 2,000% and significantly enhancing the uptake of selenium, B vitamins, and various pharmaceutical drugs.",
      "In Ayurveda, black pepper is called 'Maricha' and is considered one of the most important medicinal spices, having been prescribed for millennia for digestive disorders, respiratory conditions, and as a general metabolic stimulant.",
      "Scientific studies have documented a remarkable range of pharmacological activities including antioxidant, anti-inflammatory, antimicrobial, anti-carcinogenic, antidepressant, analgesic, antidiabetic, and neuroprotective effects.",
      "The Roman Empire's demand for pepper was so intense that in 408 AD, when the Visigoths sacked Rome, 3,000 pounds of pepper were included among the demanded ransom.",
      "Modern research has identified piperine's role in regulating thyroid function, boosting serotonin and β-endorphin production in the brain, and inhibiting tumor cell proliferation.",
      "Piper nigrum continues to be one of the most economically significant crops in India, with the states of Kerala, Karnataka, and Tamil Nadu being the primary production centers.",
    ],
    uses: [
      "Used to stimulate digestion, enhance gastric secretions, and treat dyspepsia",
      "Employed as a bioavailability enhancer for nutrients and therapeutic compounds",
      "Used to treat coughs, colds, and respiratory congestion",
      "Applied as an antioxidant to protect against oxidative cell damage",
      "Used for its anti-inflammatory properties in arthritis and pain management",
      "Employed in weight management for its thermogenic and metabolic-boosting effects",
      "Used in cancer research for its antitumor and chemoprotective properties",
      "Applied as a natural antidepressant through serotonin pathway modulation",
    ],
  },
  {
    id: 26,
    name: "Plectranthus barbatus",
    commonName: "Indian Coleus / Makandi",
    family: "Lamiaceae",
    origin: "India & East Africa",
    emoji: "🔵",
    color: "#4a6fa5",
    description: [
      "Plectranthus barbatus, also known as Indian Coleus or Forskohlii, is a fleshy-rooted perennial herb in the mint family, growing up to 60–100 cm with large, fleshy, strongly aromatic leaves.",
      "The plant produces attractive spikes of bright blue-purple to blue tubular flowers arranged in whorls, making it both a medicinal and ornamental plant cultivated in tropical gardens.",
      "Its most distinctive feature is its large, aromatic, resinous root system containing forskohlii — a unique diterpene compound that has revolutionized cardiovascular and metabolic research.",
      "Forskolin — the primary bioactive compound extracted from the roots — is one of the most pharmacologically significant natural compounds, acting as a powerful activator of adenylyl cyclase, the enzyme that produces cyclic AMP (cAMP).",
      "Cyclic AMP is a critical cellular messenger that regulates a wide range of physiological processes including heart function, metabolism, immune responses, cell growth, and smooth muscle relaxation.",
      "In Ayurveda, the plant has been described in the text 'Charaka Samhita' and used for treating heart disease, abdominal colic, respiratory conditions, and painful urination for centuries.",
      "Modern pharmaceutical research has capitalized on forskolin's unique mechanism to develop treatments for cardiovascular disease, glaucoma, asthma, obesity, and thyroid disorders.",
      "Clinical studies have demonstrated that forskolin increases thyroid hormone production, raises testosterone levels in overweight men, reduces intraocular pressure (glaucoma), and promotes fat loss.",
      "The plant has significant antibacterial, antifungal, and anti-inflammatory properties attributed to both forskolin and rosmarinic acid present in the leaves.",
      "Plectranthus barbatus is widely cultivated in India, particularly in Rajasthan and Himachal Pradesh, as a commercial source of forskolin for pharmaceutical extraction.",
    ],
    uses: [
      "Used to treat cardiovascular conditions including heart failure and hypertension",
      "Employed to manage glaucoma and reduce intraocular pressure",
      "Used to treat asthma and bronchial conditions by relaxing airway smooth muscle",
      "Applied in weight management for its fat-burning and metabolism-boosting effects",
      "Used to support thyroid function and treat hypothyroidism",
      "Employed to increase testosterone and support male reproductive health",
      "Used to treat digestive disorders, colic, and abdominal pain",
      "Applied in cancer research for its cAMP-mediated anti-proliferative effects",
    ],
  },
  {
    id: 27,
    name: "Plumbago indica",
    commonName: "Chitraka / Rose Leadwort",
    family: "Plumbaginaceae",
    origin: "South & Southeast Asia",
    emoji: "🌹",
    color: "#c0392b",
    description: [
      "Plumbago indica is a perennial shrub with slender, spreading stems and bright pink to rose-red tubular flowers arranged in dense, terminal racemes, giving it significant ornamental appeal.",
      "The plant grows up to 1.5 meters, with alternate, ovate to elliptic leaves that are smooth above and glandular-hairy on the underside.",
      "The roots and root bark are the primary medicinal parts, containing plumbagin — a hydroxynaphthoquinone pigment responsible for the plant's yellow-orange coloration and most of its pharmacological activities.",
      "In Ayurvedic medicine, Chitraka (a closely related species, Plumbago zeylanica, and Plumbago indica) is considered one of the most important digestive and metabolic stimulant herbs.",
      "Plumbagin is a potent bioactive molecule that has attracted enormous interest in oncology research for its ability to inhibit the proliferation of cancer cells and induce apoptosis (programmed cell death).",
      "Laboratory studies have demonstrated plumbagin's activity against breast cancer, prostate cancer, colon cancer, leukemia, and pancreatic cancer cell lines — often through multiple simultaneous mechanisms.",
      "The compound also exhibits strong antimicrobial activity against drug-resistant bacteria and fungi, including Methicillin-resistant Staphylococcus aureus (MRSA) and Candida species.",
      "Despite its valuable pharmacological properties, Plumbago must be used with extreme caution due to the vesicant (blister-causing) and cytotoxic nature of plumbagin at higher concentrations.",
      "In traditional Ayurvedic practice, Chitraka root is used in formulations for treating obesity, digestive weakness, malabsorption, hemorrhoids, and skin diseases — always in carefully prepared and diluted forms.",
      "Modern research continues to investigate plumbagin's mechanisms against cancer, inflammation, and antimicrobial resistance, positioning Plumbago as one of the most scientifically compelling medicinal plants.",
    ],
    uses: [
      "Used to stimulate digestion and treat malabsorption syndromes",
      "Employed to treat hemorrhoids and ano-rectal conditions",
      "Applied in cancer research for its potent antitumor and apoptosis-inducing properties",
      "Used as an antimicrobial agent against drug-resistant bacteria and fungi",
      "Employed to treat skin diseases including leprosy and leucoderma",
      "Used in weight management and obesity treatment in Ayurvedic formulations",
      "Applied to treat rheumatism, arthritis, and inflammatory conditions",
    ],
  },
  {
    id: 28,
    name: "Pseudarthria viscida",
    commonName: "Prisniparni / Sticky Pseudarthria",
    family: "Fabaceae",
    origin: "South & Southeast Asia",
    emoji: "🌿",
    color: "#567a45",
    description: [
      "Pseudarthria viscida is an erect, branching undershrub reaching up to 1.5 meters, covered with sticky glandular hairs that give it a characteristic viscid (sticky) texture — reflected in its species name.",
      "The plant bears trifoliate leaves (in groups of three) with stipules and small, pink to purple flowers in terminal and axillary racemes, followed by flat, segmented seed pods typical of the legume family.",
      "It grows in open forests, grasslands, and scrublands across South and Southeast Asia, particularly common in India, Sri Lanka, and Southeast Asian countries.",
      "In classical Ayurvedic medicine, Pseudarthria viscida is known as 'Prisniparni' and holds the prestigious position of being one of the ten Laghu Panchamula herbs — part of the foundational Dashamula formulation.",
      "Dashamula, the ten-root formulation, is one of Ayurveda's most important classical combinations, used for treating a wide range of conditions from respiratory disease to neurological disorders and as a general tonic.",
      "The plant's roots and leaves contain bioactive compounds including flavonoids, saponins, alkaloids, tannins, and phenolic compounds with documented pharmacological activities.",
      "Scientific research has confirmed anti-inflammatory, analgesic, antioxidant, and antimicrobial activities in various plant extracts, providing evidence for its traditional applications.",
      "The plant has shown promise in hepatoprotective studies, with extracts protecting liver cells from chemically induced damage similar to the effects of the standard drug silymarin.",
      "Ethnobotanical surveys across tribal communities in India have documented the plant's use for treating fever, body pain, cough, and as a tonic for convalescence and weakness.",
      "Despite its important role in classical Ayurvedic formulations, Pseudarthria viscida remains relatively understudied compared to other Dashamula plants, representing a significant research opportunity.",
    ],
    uses: [
      "Used as a key component of Dashamula formulation for respiratory, neurological, and general health conditions",
      "Employed as a general tonic and health restorative during convalescence",
      "Used to treat fever and infectious conditions",
      "Applied to manage body pain, rheumatism, and inflammation",
      "Used to treat cough, asthma, and respiratory disorders",
      "Employed for liver protection and hepatic disease management",
      "Used to treat diarrhea and digestive disorders",
    ],
  },
  {
    id: 29,
    name: "Ricinus communis linn",
    commonName: "Castor Plant / Eranda",
    family: "Euphorbiaceae",
    origin: "Africa (Ethiopia)",
    emoji: "🫙",
    color: "#7a4a2a",
    description: [
      "Ricinus communis is a fast-growing perennial shrub or small tree that can reach up to 10 meters in tropical climates, with large, distinctively palmate (star-shaped), lobed leaves that may be red-purple or dark green.",
      "The plant produces separate male and female flowers on the same plant in racemose clusters, followed by distinctive spiny, globose fruit capsules that each contain three seeds — the source of castor oil.",
      "Native to the Ethiopian region of Africa, Ricinus communis has been cultivated globally for over 4,000 years and is one of the world's most important non-edible oilseed crops.",
      "The seeds contain ricin — one of the most toxic naturally occurring substances known, capable of killing at microgram doses — making the plant simultaneously one of the most valuable and most dangerous in the world.",
      "Despite the seed's toxicity, the cold-pressed castor oil (from which ricin is separated) is completely safe and has been used for thousands of years as a medicine, lubricant, and cosmetic ingredient.",
      "Castor oil is composed of approximately 90% ricinoleic acid — a unique hydroxy fatty acid not found in significant quantities in other natural oils — which drives its remarkable physiological effects.",
      "In Ayurveda, Eranda (castor) is considered a top-tier Rasayana for Vata disorders, used extensively for treating arthritis, neurological conditions, constipation, and as a general rejuvenative.",
      "Ricinoleic acid binds to smooth muscle cell receptors in the intestines and uterus, producing the strong laxative and uterine stimulant effects that have made castor oil famous throughout history.",
      "Modern applications of castor oil span multiple industries: it is used in pharmaceuticals, cosmetics, biodiesel production, high-performance lubricants, polymers, and food packaging.",
      "The plant also has significant environmental value as a pioneer species that can grow on degraded, dry, and marginal lands, making it a candidate for bioremediation and biofuel production.",
    ],
    uses: [
      "Used as a powerful laxative to treat severe constipation",
      "Applied topically to moisturize skin, promote hair growth, and treat scalp conditions",
      "Used in Ayurveda to treat arthritis, rheumatism, and joint inflammation",
      "Employed to treat neurological disorders in traditional Vata management",
      "Used to induce labor and stimulate uterine contractions in traditional practice",
      "Applied to treat skin conditions including fungal infections and inflammation",
      "Used in formulations to treat digestive disorders and abdominal bloating",
      "Employed in wound care for its antimicrobial and anti-inflammatory properties",
    ],
  },
  {
    id: 30,
    name: "Tinospora cordifolia",
    commonName: "Giloy / Guduchi / Amrita",
    family: "Menispermaceae",
    origin: "Indian Subcontinent",
    emoji: "✨",
    color: "#2e7d32",
    description: [
      "Tinospora cordifolia, known as Guduchi or Giloy, is a large, deciduous climbing shrub with heart-shaped leaves, growing on trees across tropical and subtropical India, Sri Lanka, Myanmar, and China.",
      "Its name 'Amrita' in Sanskrit literally means 'divine nectar' or 'nectar of immortality', reflecting its revered status in Ayurveda as one of the most important and versatile herbs in the entire materia medica.",
      "The plant produces small, yellow flowers and fleshy, red drupes in clusters, with characteristic aerial roots that hang from the branches and also serve medicinal purposes.",
      "Tinospora cordifolia contains an extraordinary chemical diversity including alkaloids (berberine, palmatine, tinosporin, choline), diterpenoid lactones (tinosporide, columbin), steroids, glycosides, and polysaccharides.",
      "It is classified as a premier Rasayana in Ayurveda — a class of herbs that enhance vitality, boost immunity, promote longevity, and improve the quality of all seven body tissues (dhatus).",
      "As an immunomodulator, Tinospora cordifolia demonstrates the ability to both stimulate and regulate the immune system — enhancing macrophage activity, increasing phagocytosis, and modulating cytokine production.",
      "Clinical research has validated its effectiveness in managing dengue fever, reducing thrombocytopenia (low platelet count), and improving overall recovery from febrile illnesses.",
      "The plant has demonstrated significant antidiabetic effects, reducing fasting blood glucose and glycated hemoglobin (HbA1c) levels in clinical studies of type 2 diabetic patients.",
      "During the COVID-19 pandemic, Giloy gained unprecedented attention globally for its immunomodulatory properties, leading to a massive surge in demand and numerous research studies on its antiviral potential.",
      "Tinospora cordifolia represents perhaps the broadest pharmacological spectrum of any single Ayurvedic herb — with documented anti-inflammatory, antioxidant, antidiabetic, hepatoprotective, anticancer, antistress, and antipyretic activities.",
    ],
    uses: [
      "Used as a premier immune booster and adaptogen for general health",
      "Employed to manage type 2 diabetes and control blood glucose levels",
      "Used to treat dengue fever, malaria, and other febrile illnesses",
      "Applied as a liver tonic and hepatoprotective agent for liver diseases",
      "Used for its anti-inflammatory properties in arthritis and joint diseases",
      "Employed to treat digestive disorders including diarrhea and dyspepsia",
      "Used in cancer research for its anticancer and immunomodulatory properties",
      "Applied to reduce oxidative stress and protect against cellular aging",
      "Used to manage anxiety and act as a nervine tonic",
    ],
  },
];

export default function MedicinalPlantsEncyclopedia() {
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  const filtered = plants.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.commonName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.family.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const plant = selectedPlant
    ? plants.find((p) => p.id === selectedPlant)
    : null;

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", minHeight: "100vh", background: "#f9f6f0", color: "#2c2416" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1a3a1e 0%, #2d5a27 50%, #1a4a2e 100%)", padding: "2.5rem 2rem 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.08, backgroundImage: "radial-gradient(circle at 20% 50%, #fff 1px, transparent 1px), radial-gradient(circle at 80% 20%, #fff 1px, transparent 1px), radial-gradient(circle at 60% 80%, #fff 1px, transparent 1px)", backgroundSize: "60px 60px, 40px 40px, 50px 50px" }} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🌿</div>
          <h1 style={{ color: "#e8f5e1", fontSize: "2rem", fontWeight: "bold", margin: "0 0 0.4rem", letterSpacing: "0.02em", textShadow: "0 2px 8px rgba(0,0,0,0.3)" }}>
            Medicinal Plants Encyclopedia
          </h1>
          <p style={{ color: "#a8d5a2", margin: "0 0 1.5rem", fontSize: "1rem", fontStyle: "italic" }}>
            30 Healing Herbs of Ayurvedic & Traditional Medicine
          </p>
          <div style={{ maxWidth: "420px", margin: "0 auto" }}>
            <input
              type="text"
              placeholder="Search by plant name, common name, or family..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%", padding: "0.7rem 1rem", borderRadius: "8px", border: "2px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.12)", color: "#fff", fontSize: "0.9rem", outline: "none", boxSizing: "border-box", backdropFilter: "blur(4px)" }}
            />
          </div>
        </div>
      </div>

      <div style={{ display: "flex", maxWidth: "1300px", margin: "0 auto", gap: "0", minHeight: "calc(100vh - 200px)" }}>
        {/* Sidebar List */}
        <div style={{ width: "300px", minWidth: "260px", background: "#fff", borderRight: "1px solid #e0d8cc", overflowY: "auto", maxHeight: "calc(100vh - 200px)", position: "sticky", top: 0 }}>
          <div style={{ padding: "0.75rem 1rem", background: "#f4efe8", borderBottom: "1px solid #e0d8cc", fontSize: "0.8rem", color: "#7a6a55", fontWeight: "600", letterSpacing: "0.08em", textTransform: "uppercase" }}>
            {filtered.length} Plants
          </div>
          {filtered.map((p) => (
            <div
              key={p.id}
              onClick={() => { setSelectedPlant(p.id); setActiveTab("description"); }}
              style={{
                padding: "0.9rem 1rem",
                cursor: "pointer",
                borderBottom: "1px solid #f0ebe2",
                background: selectedPlant === p.id ? `${p.color}15` : "transparent",
                borderLeft: selectedPlant === p.id ? `4px solid ${p.color}` : "4px solid transparent",
                transition: "all 0.15s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ fontSize: "1.3rem" }}>{p.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: "600", fontSize: "0.82rem", color: "#1a2e1a", fontStyle: "italic", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#7a6a55", marginTop: "1px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {p.commonName.split(" / ")[0]}
                  </div>
                </div>
                <span style={{ fontSize: "0.65rem", padding: "2px 6px", borderRadius: "4px", background: `${p.color}20`, color: p.color, fontWeight: "600", whiteSpace: "nowrap" }}>
                  #{p.id}
                </span>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div style={{ padding: "2rem", textAlign: "center", color: "#9a8a75" }}>
              No plants found
            </div>
          )}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, overflowY: "auto", background: "#fdfaf5" }}>
          {!plant ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", minHeight: "400px", color: "#9a8a75", textAlign: "center", padding: "2rem" }}>
              <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🌿</div>
              <h2 style={{ margin: "0 0 0.5rem", color: "#4a7c59", fontSize: "1.5rem" }}>Select a Plant</h2>
              <p style={{ margin: 0, fontSize: "1rem" }}>Choose any of the 30 medicinal plants from the list to view its full description and uses.</p>
            </div>
          ) : (
            <div style={{ padding: "2rem" }}>
              {/* Plant Header */}
              <div style={{ background: `linear-gradient(135deg, ${plant.color}18, ${plant.color}08)`, border: `1px solid ${plant.color}30`, borderRadius: "12px", padding: "1.75rem", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                  <div style={{ fontSize: "3.5rem", lineHeight: 1 }}>{plant.emoji}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap", marginBottom: "0.3rem" }}>
                      <h2 style={{ margin: 0, fontSize: "1.7rem", fontStyle: "italic", color: "#1a2e1a", fontWeight: "bold" }}>
                        {plant.name}
                      </h2>
                      <span style={{ background: plant.color, color: "#fff", padding: "3px 10px", borderRadius: "20px", fontSize: "0.72rem", fontWeight: "600", fontStyle: "normal" }}>
                        Plant #{plant.id}
                      </span>
                    </div>
                    <div style={{ fontSize: "1.1rem", color: plant.color, fontWeight: "600", marginBottom: "0.6rem" }}>
                      {plant.commonName}
                    </div>
                    <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
                      <div>
                        <span style={{ fontSize: "0.72rem", color: "#9a8a75", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: "600" }}>Family</span>
                        <div style={{ fontSize: "0.88rem", color: "#3a3a2a", marginTop: "1px" }}>{plant.family}</div>
                      </div>
                      <div>
                        <span style={{ fontSize: "0.72rem", color: "#9a8a75", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: "600" }}>Origin</span>
                        <div style={{ fontSize: "0.88rem", color: "#3a3a2a", marginTop: "1px" }}>{plant.origin}</div>
                      </div>
                      <div>
                        <span style={{ fontSize: "0.72rem", color: "#9a8a75", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: "600" }}>Medicinal Uses</span>
                        <div style={{ fontSize: "0.88rem", color: "#3a3a2a", marginTop: "1px" }}>{plant.uses.length} documented</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", gap: "0", marginBottom: "1.5rem", background: "#fff", borderRadius: "8px", padding: "4px", border: "1px solid #e0d8cc" }}>
                {["description", "uses"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      flex: 1,
                      padding: "0.6rem 1rem",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontFamily: "Georgia, serif",
                      fontSize: "0.88rem",
                      fontWeight: "600",
                      transition: "all 0.2s ease",
                      background: activeTab === tab ? plant.color : "transparent",
                      color: activeTab === tab ? "#fff" : "#7a6a55",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {tab === "description" ? `📖 Description (${plant.description.length} lines)` : `💊 Medicinal Uses (${plant.uses.length})`}
                  </button>
                ))}
              </div>

              {/* Description Tab */}
              {activeTab === "description" && (
                <div>
                  <div style={{ display: "grid", gap: "0.75rem" }}>
                    {plant.description.map((line, i) => (
                      <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", background: "#fff", borderRadius: "8px", padding: "1rem 1.25rem", border: "1px solid #ede8df", boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                        <div style={{ minWidth: "28px", height: "28px", borderRadius: "50%", background: `${plant.color}20`, color: plant.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: "700", flexShrink: 0 }}>
                          {i + 1}
                        </div>
                        <p style={{ margin: 0, lineHeight: "1.75", color: "#2c2416", fontSize: "0.93rem" }}>{line}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Uses Tab */}
              {activeTab === "uses" && (
                <div>
                  <div style={{ display: "grid", gap: "0.75rem" }}>
                    {plant.uses.map((use, i) => (
                      <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", background: "#fff", borderRadius: "8px", padding: "1rem 1.25rem", border: `1px solid ${plant.color}25`, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                        <div style={{ minWidth: "28px", height: "28px", borderRadius: "6px", background: plant.color, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: "700", flexShrink: 0 }}>
                          {i + 1}
                        </div>
                        <p style={{ margin: 0, lineHeight: "1.75", color: "#2c2416", fontSize: "0.93rem" }}>{use}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "2rem", gap: "1rem" }}>
                <button
                  onClick={() => { if (plant.id > 1) { setSelectedPlant(plant.id - 1); setActiveTab("description"); } }}
                  disabled={plant.id === 1}
                  style={{ padding: "0.6rem 1.2rem", background: plant.id === 1 ? "#f0ebe2" : "#fff", border: "1px solid #e0d8cc", borderRadius: "8px", cursor: plant.id === 1 ? "not-allowed" : "pointer", color: plant.id === 1 ? "#c0b8a8" : "#4a7c59", fontFamily: "Georgia, serif", fontSize: "0.88rem", fontWeight: "600" }}
                >
                  ← Previous Plant
                </button>
                <span style={{ alignSelf: "center", fontSize: "0.82rem", color: "#9a8a75" }}>
                  {plant.id} / {plants.length}
                </span>
                <button
                  onClick={() => { if (plant.id < plants.length) { setSelectedPlant(plant.id + 1); setActiveTab("description"); } }}
                  disabled={plant.id === plants.length}
                  style={{ padding: "0.6rem 1.2rem", background: plant.id === plants.length ? "#f0ebe2" : "#fff", border: "1px solid #e0d8cc", borderRadius: "8px", cursor: plant.id === plants.length ? "not-allowed" : "pointer", color: plant.id === plants.length ? "#c0b8a8" : "#4a7c59", fontFamily: "Georgia, serif", fontSize: "0.88rem", fontWeight: "600" }}
                >
                  Next Plant →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

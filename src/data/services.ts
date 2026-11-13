import type { Service, ServiceCategory } from "@/lib/types";
import type { MessageKey } from "@/lib/messages";

export const categoryRoutes: Record<
  ServiceCategory,
  { path: string; aliases: string[]; heading: MessageKey; titleEn: string; titleBn: string }
> = {
  criminal: {
    path: "/services/criminal-lawyer",
    aliases: ["/services/criminal"],
    heading: "criminal",
    titleEn: "Criminal Lawyer in Bangladesh",
    titleBn: "বাংলাদেশে ফৌজদারি আইনজীবী",
  },
  constitutional: {
    path: "/services/constitutional-law-attorney",
    aliases: ["/services/constitutional"],
    heading: "constitutional",
    titleEn: "Constitutional Lawyer in Bangladesh",
    titleBn: "বাংলাদেশে সাংবিধানিক আইনজীবী",
  },
  civil: {
    path: "/services/civil-litigation-lawyer",
    aliases: ["/services/civil"],
    heading: "civil",
    titleEn: "Civil Litigation Lawyer in Bangladesh",
    titleBn: "বাংলাদেশে দেওয়ানি আইনজীবী",
  },
  family: {
    path: "/services/family-law-attorney",
    aliases: ["/services/family-law"],
    heading: "family",
    titleEn: "Family Law Attorney in Bangladesh",
    titleBn: "বাংলাদেশে পারিবারিক আইনজীবী",
  },
  company: {
    path: "/services/company-lawyer",
    aliases: ["/services/company"],
    heading: "company",
    titleEn: "Company Lawyer in Bangladesh",
    titleBn: "বাংলাদেশে কোম্পানি আইনজীবী",
  },
  "pro-bono": {
    path: "/services/pro-bono-lawyer",
    aliases: ["/services/pro-bono"],
    heading: "proBono",
    titleEn: "Pro Bono Lawyer in Bangladesh",
    titleBn: "বাংলাদেশে প্রো বোনো আইনজীবী",
  },
};

export const services: Service[] = [
  {
    id: "death-sentence",
    category: "criminal",
    position: 1,
    title: { en: "Death Sentence", bn: "মৃত্যুদণ্ড" },
    excerpt: { en: "When a trial Court awards capital sentence to the convict, the said Court submits the proceedings to the High Court Division for confirmation of...", bn: "বিচারিক আদালত মৃত্যুদণ্ডাদেশ প্রদানের পর দণ্ডাদেশ নিশ্চিত করণের (Confirm) জন্য হাইকোর্ট বিভাগ প্রেরণ করে ফৌজদারী কার্যবিধির ৩ ধারা ৩৭৪ অনুযায়ী উক্ত রেফারেন্স..." },
    body: { en: "<p>When a trial Court awards capital sentence to the convict, the said Court submits the proceedings to the High Court Division for confirmation of the death sentence under section 374 of the Code of Criminal Procedure, 1898. The High Court Division may confirm/annul the conviction or pass another sentence or acquit the convict. The Law Emporium has represented death convicts of sensational murder cases i.e. Ramna Batmul case, BDR case, Nusrat Murder Case, Tuhin Murder Case.</p>", bn: "<p>বিচারিক আদালত মৃত্যুদণ্ডাদেশ প্রদানের পর দণ্ডাদেশ নিশ্চিত করণের (Confirm) জন্য হাইকোর্ট বিভাগ প্রেরণ করে ফৌজদারী কার্যবিধির ৩ ধারা ৩৭৪ অনুযায়ী উক্ত রেফারেন্স প্রেরণ করা হয়। হাইকোর্ট বিভাগ সাজা নিশ্চিত/বাতিল/অন্য কোন সাজা প্রদান করতে পারে। দ্য ল’ এম্পোরিয়াম বেশ কিছু চাঞ্চল্যকর হত্যা মামলার আসামীদের পক্ষে মামলা পরিচালনা করেছে। এসবের মধ্যে রমনা বটমূল বোমা হামলা, বিডিআর হত্যাকাণ্ড, নুসরাত হত্যা মামলা, তুহিন হত্যা মামলা ইত্যাদি।</p>" },
    cases: { en: "<ol><li><p><strong>State versus Abdul Gafur, 73 DLR 198</strong></p><p>(On behalf of Condemned Prisoner), (Altered from 302 (Death Sentence) to Part II of 304 (Sentence served about 7 years only, News Link</p></li><li><p><strong>State versus Abdul Khaleq, 73 DLR 260</strong></p><p>(On behalf of Condemned Prisoner), (Death Sentence to Acquittal) (State filed Criminal Petition for Leave to Appeal  before the Appellate Division against the Judgment of acquittal and the same is pending before the said Hon’ble Court) , News Link</p></li><li><p><strong>State versus Md. Shah Alam Howlader, Death Reference No. 69 of 2015</strong></p><p>(On behalf of Condemned Prisoner), (Death commuted to Imprisonment for life), News Link</p></li><li><p><strong>State versus Md. Rasel Mia, Death Reference No. 48 of 2015</strong></p><p>(On behalf of Condemned Prisoner), (Death commuted to Imprisonment for life), News Link</p></li><li><p><strong>State versus Mowlana Akbar Hossain alias Helal Uddin and others, Death Reference No. 42 of 2014</strong></p><p>(On behalf of Condemned Prisoner), (Pending before the High Court Division), News Link</p></li><li><p><strong>State versus Md. Shah Alam, Death Reference No. 14 of 2020</strong></p><p>(On behalf of Condemned Prisoner), (Pending before the High Court Division), News Link</p></li><li><p><strong>State versus Md. Abdul Basir and Others, Death Reference No. 44 of 2020</strong></p><p>(On behalf of Condemned Prisoner), (Pending before the High Court Division), News Link</p></li><li><p><strong>State versus A. Latif Kha alias Lotu Kha, Death Reference No. 05 of 2016</strong></p><p>(On behalf of Condemned Prisoner), (Death Reference to imprisonment for life), News Link</p></li><li><p><strong>Swapon Kumar Biswas versus State, (Death Reference No. 120 of 2008</strong></p><p>(On behalf of the Petitioner), ( High Court Division affirmed the sentence of death)(The Convict filed Jail Petition No. 15 of 2014 before the Appellate Division. The Hon’ble Court commuted sentence of death of petitioner to imprisonment for life and also sentenced to pay a fine of Tk.5,000/= (five thousand), in default, to suffer rigorous imprisonment for 15 (fifteen) days more. ) (The Law Emporium conducted this case pro bono), News Link</p></li><li><p><strong>State versus Nazmul Hossain alias Azmul, Death Reference No. 05 of 2016</strong></p><p>(On behalf of Condemned Prisoner), (Death Reference Rejected, Death sentence to imprisonment for life), News Link</p></li><li><p><strong>State versus Md. Mostafa Sarder, Death Reference No. 87 of 2015</strong></p><p>(On behalf of Condemned Prisoner), (Acquittal), News Link</p></li><li><p><strong>State versus Md. Anwar Hossain alias Shankar Chandra Debnath, Death Reference No. 26 of 2016</strong></p><p>(On behalf of Condemned Prisoner), (Acquittal), News Link</p></li><li><p><strong>State versus Md. Sumon Jomaddar, Death Reference No. 06 of 2016</strong></p><p>(On behalf of Condemned Prisoner), (Acquittal), News Link</p></li><li><p><strong>State versus Alam, Death Reference No. 130 of 2021</strong></p><p>(On behalf of Condemned Prisoner), (Pending before the High Court Division), News Link</p></li><li><p><strong>State versus Md. Sabuj Mia, Death Reference No. 146 of 2021</strong></p><p>(On behalf of Condemned Prisoner), (Pending before the High Court Division), News Link</p></li><li><p><strong>State versus Mahmudul Islam, Death Reference No. 22 of 2016</strong></p><p>(On behalf of Condemned Prisoner), (Death sentence commuted to imprisonment for life)News Link</p></li><li><p><strong>State versus Shakil Mia, Death Reference No. 94 of 2016</strong></p><p>(On behalf of Condemned Prisoner), (Pending before the High Court Division), News Link</p></li></ol><p><br></p><p><strong> </strong></p>", bn: "<ol><li><p><strong>State versus Abdul Gafur, 73 DLR 198</strong></p><p>(On behalf of Condemned Prisoner), (Altered from 302 (Death Sentence) to Part II of 304 (Sentence served about 7 years only, News Link</p></li><li><p><strong>State versus Abdul Khaleq, 73 DLR 260</strong></p><p>(On behalf of Condemned Prisoner), (Death Sentence to Acquittal) (State filed Criminal Petition for Leave to Appeal  before the Appellate Division against the Judgment of acquittal and the same is pending before the said Hon’ble Court) , News Link</p></li><li><p><strong>State versus Md. Shah Alam Howlader, Death Reference No. 69 of 2015</strong></p><p>(On behalf of Condemned Prisoner), (Death commuted to Imprisonment for life), News Link</p></li><li><p><strong>State versus Md. Rasel Mia, Death Reference No. 48 of 2015</strong></p><p>(On behalf of Condemned Prisoner), (Death commuted to Imprisonment for life), News Link</p></li><li><p><strong>State versus Mowlana Akbar Hossain alias Helal Uddin and others, Death Reference No. 42 of 2014</strong></p><p>(On behalf of Condemned Prisoner), (Pending before the High Court Division), News Link</p></li><li><p><strong>State versus Md. Shah Alam, Death Reference No. 14 of 2020</strong></p><p>(On behalf of Condemned Prisoner), (Pending before the High Court Division), News Link</p></li><li><p><strong>State versus Md. Abdul Basir and Others, Death Reference No. 44 of 2020</strong></p><p>(On behalf of Condemned Prisoner), (Pending before the High Court Division), News Link</p></li><li><p><strong>State versus A. Latif Kha alias Lotu Kha, Death Reference No. 05 of 2016</strong></p><p>(On behalf of Condemned Prisoner), (Death Reference to imprisonment for life), News Link</p></li><li><p><strong>Swapon Kumar Biswas versus State, (Death Reference No. 120 of 2008</strong></p><p>(On behalf of the Petitioner), ( High Court Division affirmed the sentence of death)(The Convict filed Jail Petition No. 15 of 2014 before the Appellate Division. The Hon’ble Court commuted sentence of death of petitioner to imprisonment for life and also sentenced to pay a fine of Tk.5,000/= (five thousand), in default, to suffer rigorous imprisonment for 15 (fifteen) days more. ) (The Law Emporium conducted this case pro bono), News Link</p></li><li><p><strong>State versus Nazmul Hossain alias Azmul, Death Reference No. 05 of 2016</strong></p><p>(On behalf of Condemned Prisoner), (Death Reference Rejected, Death sentence to imprisonment for life), News Link</p></li><li><p><strong>State versus Md. Mostafa Sarder, Death Reference No. 87 of 2015</strong></p><p>(On behalf of Condemned Prisoner), (Acquittal), News Link</p></li><li><p><strong>State versus Md. Anwar Hossain alias Shankar Chandra Debnath, Death Reference No. 26 of 2016</strong></p><p>(On behalf of Condemned Prisoner), (Acquittal), News Link</p></li><li><p><strong>State versus Md. Sumon Jomaddar, Death Reference No. 06 of 2016</strong></p><p>(On behalf of Condemned Prisoner), (Acquittal), News Link</p></li><li><p><strong>State versus Alam, Death Reference No. 130 of 2021</strong></p><p>(On behalf of Condemned Prisoner), (Pending before the High Court Division), News Link</p></li><li><p><strong>State versus Md. Sabuj Mia, Death Reference No. 146 of 2021</strong></p><p>(On behalf of Condemned Prisoner), (Pending before the High Court Division), News Link</p></li><li><p><strong>State versus Mahmudul Islam, Death Reference No. 22 of 2016</strong></p><p>(On behalf of Condemned Prisoner), (Death sentence commuted to imprisonment for life)News Link</p></li><li><p><strong>State versus Shakil Mia, Death Reference No. 94 of 2016</strong></p><p>(On behalf of Condemned Prisoner), (Pending before the High Court Division), News Link</p></li></ol><p><br></p><p><strong> </strong></p>" },
  },
  {
    id: "imprisonment-for-the-rest-of-natural-life",
    category: "criminal",
    position: 2,
    title: { en: "Imprisonment for the Rest of Natural Life", bn: "আমৃত্যু কারাদণ্ড" },
    excerpt: { en: "Sometimes the Judges have to decide between death sentence and imprisonment for life considering the gravity of offences. In this rare situation...", bn: "অপরাধের ভয়াবহতা বিবেচনা করে আদালত কিছু বিরল মামলায় আসামীকে মৃত্যুদণ্ড ও যাবজ্জীবন সাজার মধ্যবর্তী একটি সাজা প্রদান করে। উক্ত সাজা হচ্ছে আমৃত্যু কারাদণ্ড" },
    body: { en: "<p>Sometimes the Judges have to decide between death sentence and imprisonment for life considering the gravity of offences. In this rare situation, the Judges opt to award the sentence of imprisonment for the rest of natural life to confine him custody forever.  </p>", bn: "<p>অপরাধের ভয়াবহতা বিবেচনা করে আদালত কিছু বিরল মামলায় আসামীকে মৃত্যুদণ্ড ও যাবজ্জীবন সাজার মধ্যবর্তী একটি সাজা প্রদান করে। উক্ত সাজা হচ্ছে আমৃত্যু কারাদণ্ড।</p>" },
    cases: { en: "<ol><li><p><strong>Ataur Mridha vs State, Criminal Appeal No.</strong> <strong>Criminal Appeal Nos. 15-16 of 2010</strong></p><p>(On behalf of the Appellant, the Appellant Division sentenced Ataur Mridha and another to imprisonment for the rest of natural life,  in review petition Ataur Mridha has been sentenced to imprisonment for life)</p></li></ol>", bn: "<ol><li><p><strong>Ataur Mridha vs State, Criminal Appeal No.</strong> <strong>Criminal Appeal Nos. 15-16 of 2010</strong></p><p>(On behalf of the Appellant, the Appellant Division sentenced Ataur Mridha and another to imprisonment for the rest of natural life,  in review petition Ataur Mridha has been sentenced to imprisonment for life)</p></li></ol>" },
  },
  {
    id: "imprisonment-for-life",
    category: "criminal",
    position: 3,
    title: { en: "Imprisonment for Life", bn: "যাবজ্জীবন কারাদণ্ড" },
    excerpt: { en: "When offences is proved beyond reasonable doubt and the mitigating circumstances outweigh the aggravating circumstances...", bn: "অপরাধ সন্দেহাতীত ভাবে প্রমাণিত হলে এবং বিচারক উপাদান সমূহ প্রাধান্য লাভ করলে আদালত মৃত্যুদণ্ডের পরিবর্তে যাবজ্জীবন সাজা প্রদান করে।" },
    body: { en: "<p>When offences is proved beyond reasonable doubt and the mitigating circumstances outweigh the aggravating circumstances, the Court awards imprisonment for life instead of capital punishment-death sentence.</p>", bn: "<p>অপরাধ সন্দেহাতীত ভাবে প্রমাণিত হলে এবং বিচারক উপাদান সমূহ প্রাধান্য লাভ করলে আদালত মৃত্যুদণ্ডের পরিবর্তে যাবজ্জীবন সাজা প্রদান করে।</p><p><br><br></p>" },
    cases: { en: "<p><strong><span>1.    Siddique Farazi vs State, 73 DLR 79</span></strong></p><p><span>(On behalf the Appellant, Trial Court convicted under section 302 and sentenced to imprisonment for life. High Court Division altered the conviction to section 304 Part I of the Penal Code and sentenced to imprisonment for the period already undergone ) News Link</span></p><p><strong><span>2.    State versus Md. Rasel Mia, Death Reference No. 48 of 2015</span></strong></p><p><span>(On behalf of Condemned Prisoner, Death commuted to Imprisonment for life, the Convict filed appeal before the Appellate Division) News Link</span></p><p><strong><span>3.    State versus Abdul Khaleq, <u>73 DLR 260</u></span></strong></p><p><span>(On behalf of Condemned Prisoner), (Death Sentence to Acquittal) (State filed Criminal Petition for Leave to Appeal  before the Appellate Division against the Judgment of acquittal and the same is pending before the said Hon’ble Court, the State filed appeal before the Appellate Division of the Supreme Court of Bangladesh) , <u>News Link</u></span></p>", bn: "<p><strong><span>1.    Siddique Farazi vs State, 73 DLR 79</span></strong></p><p><span>(On behalf the Appellant, Trial Court convicted under section 302 and sentenced to imprisonment for life. High Court Division altered the conviction to section 304 Part I of the Penal Code and sentenced to imprisonment for the period already undergone ) News Link</span></p><p><strong><span>2.    State versus Md. Rasel Mia, Death Reference No. 48 of 2015</span></strong></p><p><span>(On behalf of Condemned Prisoner, Death commuted to Imprisonment for life, the Convict filed appeal before the Appellate Division) News Link</span></p><p><strong><span>3.    State versus Abdul Khaleq, <u>73 DLR 260</u></span></strong></p><p><span>(On behalf of Condemned Prisoner), (Death Sentence to Acquittal) (State filed Criminal Petition for Leave to Appeal  before the Appellate Division against the Judgment of acquittal and the same is pending before the said Hon’ble Court, the State filed appeal before the Appellate Division of the Supreme Court of Bangladesh) , <u>News Link</u></span></p>" },
  },
  {
    id: "criminal-appeal-against-conviction",
    category: "criminal",
    position: 4,
    title: { en: "Criminal Appeal Against Conviction", bn: "দণ্ডাদেশের বিরুদ্ধে আপীল" },
    excerpt: { en: "When the trial Court convicts and sentences the accused, he may file appeal before the superior Court challenging the conviction and sentence.", bn: "বিচারিক আদালত অভিযুক্ত ব্যাক্তিকে দণ্ড ও সাজা প্রদান করলে তিনি উচ্চ আদালতে উক্ত দণ্ড ও সাজা চ্যালেঞ্জ করে আপীল দায়ের করতে পারেন।" },
    body: { en: "<p>When the trial Court convicts and sentences the accused, he may file appeal before the superior Court challenging the conviction and sentence.</p>", bn: "<p>বিচারিক আদালত অভিযুক্ত ব্যাক্তিকে দণ্ড ও সাজা প্রদান করলে তিনি উচ্চ আদালতে উক্ত দণ্ড ও সাজা চ্যালেঞ্জ করে আপীল দায়ের করতে পারেন।</p>" },
    cases: { en: "<ol><li><p><strong>Tushar Das @ Raj vs The State, Criminal Appeal No. 8554 Of 2019</strong></p><p>(On behalf the Appellant, Trial Court awarded imprisonment for a period of 14 (fourteen) years. High Court Division acquitted him of the charge, the case is based on inter caste marriage.) <a rel=\"noopener noreferrer nofollow\" href=\"#\">News Link</a></p></li><li><p><strong>Siddique Farazi vs State, 73 DLR 79</strong></p><p>(On behalf the Appellant, Trial Court convicted under section 302 and sentenced to imprisonment for life. High Court Division altered the conviction to section 304 Part I of the Penal Code and sentenced to imprisonment for the period already undergone) News Link</p></li><li><p><strong>Md. Mohshin Sharif vs State and another,  Criminal Appeal No. 1734 of 2020</strong></p><p>(On behalf the Appellant, Trial Court convicted under 408 and 409 of the Penal Code, 1860 in anti-corruption case and sentenced to imprisonment for for a period of 5 (five) years and fine. High Court Division enlarged the Appellant on ad-interim bail till disposal of the appeal). News Link</p></li><li><p><strong>Babur @ Babul Sardar vs State, Criminal Appeal No. 6921 of 2018</strong></p><p>(On behalf the Appellant, Trial Court rejected the prayer of bail in a case under sections 396/412 of the Penal Code, 1860 read with sections 3/ 4 of the Explosive Substances Act, 1908. High Court Division enlarged the Appellant on bail, Ashulia Bank Robbery Case). News Link</p></li><li><p><strong>Md. Azom Bepary  vs State, Criminal Appeal NO. 93 of 2019</strong></p><p>(On behalf of the Appellant, Trial Court sentenced to imprisonment for a period of 10 (ten) years and fine, the High Court Division acquitted the Appellant of the Charge). News Link</p></li></ol>", bn: "<ol><li><p><strong>Tushar Das @ Raj vs The State, Criminal Appeal No. 8554 Of 2019</strong></p><p>(On behalf the Appellant, Trial Court awarded imprisonment for a period of 14 (fourteen) years. High Court Division acquitted him of the charge, the case is based on inter caste marriage.) <a rel=\"noopener noreferrer nofollow\" href=\"#\">News Link</a></p></li><li><p><strong>Siddique Farazi vs State, 73 DLR 79</strong></p><p>(On behalf the Appellant, Trial Court convicted under section 302 and sentenced to imprisonment for life. High Court Division altered the conviction to section 304 Part I of the Penal Code and sentenced to imprisonment for the period already undergone) News Link</p></li><li><p><strong>Md. Mohshin Sharif vs State and another,  Criminal Appeal No. 1734 of 2020</strong></p><p>(On behalf the Appellant, Trial Court convicted under 408 and 409 of the Penal Code, 1860 in anti-corruption case and sentenced to imprisonment for for a period of 5 (five) years and fine. High Court Division enlarged the Appellant on ad-interim bail till disposal of the appeal). News Link</p></li><li><p><strong>Babur @ Babul Sardar vs State, Criminal Appeal No. 6921 of 2018</strong></p><p>(On behalf the Appellant, Trial Court rejected the prayer of bail in a case under sections 396/412 of the Penal Code, 1860 read with sections 3/ 4 of the Explosive Substances Act, 1908. High Court Division enlarged the Appellant on bail, Ashulia Bank Robbery Case). News Link</p></li><li><p><strong>Md. Azom Bepary  vs State, Criminal Appeal NO. 93 of 2019</strong></p><p>(On behalf of the Appellant, Trial Court sentenced to imprisonment for a period of 10 (ten) years and fine, the High Court Division acquitted the Appellant of the Charge). News Link</p></li></ol>" },
  },
  {
    id: "criminal-appeal-against-order",
    category: "criminal",
    position: 5,
    title: { en: "Criminal Appeal against Order", bn: "আদেশের বিরুদ্ধে আপিল" },
    excerpt: { en: "The Court passes various orders in query and trial stages of the case. An aggrieved party may file an appeal against the Order before the Appellate Court.", bn: "তদন্ত এবং বিচারের পর্যায়ে আদালত বিভিন্ন আদেশ প্রদান করে থাকেন। সে আদেশসমূহের বিরুদ্ধে আপিল আদালতে আপিল দায়ের করা যায়।" },
    body: { en: "<p>The Court passes various orders in query and trial stages of the case. An aggrieved party may file an appeal against the Order before the Appellate Court.</p>", bn: "<p>তদন্ত এবং বিচারের পর্যায়ে আদালত বিভিন্ন আদেশ প্রদান করে থাকেন। সে আদেশসমূহের বিরুদ্ধে আপিল আদালতে আপিল দায়ের করা যায়। </p>" },
    cases: { en: "<ol><li><p><strong>Md. Hanif @ Hanif versus State, Criminal Appeal No.  10651 of 2018</strong></p><p>(The Accused-Appellant preferred appeal before the High Court Division against the Order of the Tribunal rejecting an application for bail. The Court allowed the appeal and granted him bail.)</p></li><li><p><strong>Md. Masum Billah  and others versus State, Criminal Appeal No. 49 of 2019 </strong></p><p>(The Accused-Appellant preferred appeal before the High Court Division against the Order of the Special Tribunal rejecting an application for bail. The Court allowed the appeal and granted him bail.)</p></li></ol>", bn: "<ol><li><p><strong>Md. Hanif @ Hanif versus State, Criminal Appeal No.  10651 of 2018</strong></p><p>(The Accused-Appellant preferred appeal before the High Court Division against the Order of the Tribunal rejecting an application for bail. The Court allowed the appeal and granted him bail.)</p></li><li><p><strong>Md. Masum Billah  and others versus State, Criminal Appeal No. 49 of 2019 </strong></p><p>(The Accused-Appellant preferred appeal before the High Court Division against the Order of the Special Tribunal rejecting an application for bail. The Court allowed the appeal and granted him bail.)</p></li></ol>" },
  },
  {
    id: "criminal-appeal-against-acquittal",
    category: "criminal",
    position: 6,
    title: { en: "Criminal Appeal Against Acquittal", bn: "খালাসের বিরুদ্ধে আপীল" },
    excerpt: { en: "The State or the Complainant may file appeal against the Judgment and Order of acquittal before the High Court Division.", bn: "রাষ্ট্রপক্ষ বা অভিযোগকারী বিচারিক আদালতের খালাস ও রায়ের আদেশের বিরুদ্ধে হাইকোর্ট বিভাগে আপীল দায়ের করতে পারেন।তবে উক্ত আপীল দায়েরের ক্ষেত্র/সুঝোগ খুবই সংকীর্ণ।" },
    body: { en: "<p>The State or the Complainant may file appeal against the Judgment and Order of acquittal before the High Court Division. However, the scope of this appeal is very limited.</p>", bn: "<p>রাষ্ট্রপক্ষ বা অভিযোগকারী বিচারিক আদালতের খালাস ও রায়ের আদেশের বিরুদ্ধে হাইকোর্ট বিভাগে আপীল দায়ের করতে পারেন।তবে উক্ত আপীল দায়েরের ক্ষেত্র/সুঝোগ খুবই সংকীর্ণ।</p>" },
    cases: { en: "<ol><li><p><strong>MD. DULAL MOLLA VERSUS THE STATE AND ANOTHER, CRIMINAL APPEAL NO. 547 OF 2021. </strong></p><p>The Appellant filed appeal challenging the judgment of acquittal. The High Court Division admitted the appeal. Now it is pending for hearing.</p></li></ol>", bn: "<ol><li><p><strong>MD. DULAL MOLLA VERSUS THE STATE AND ANOTHER, CRIMINAL APPEAL NO. 547 OF 2021. </strong></p><p>The Appellant filed appeal challenging the judgment of acquittal. The High Court Division admitted the appeal. Now it is pending for hearing.</p></li></ol>" },
  },
  {
    id: "criminal-revision",
    category: "criminal",
    position: 7,
    title: { en: "Criminal Revision", bn: "ফৌজদারী রিভিশন" },
    excerpt: { en: "Both the Sessions Judge and the High Court Division have concurrent powers of Criminal Revision. Unlike Civil Courts, there is no second...", bn: "ফৌজদারী রিভিশন নিষ্পত্তির ক্ষেত্রে দায়রা আদালত ও হাইকোর্ট বিভাগ উভয়ের সমবর্তী ক্ষমতা রয়েছে দেওয়ানী আদালতের মত ফৌজদারী আদালতে দ্বিতীয় রিভিশন..." },
    body: { en: "<p>Both the Sessions Judge and the High Court Division have concurrent powers of Criminal Revision. Unlike Civil Courts, there is no second revision in criminal Courts. Even a third party can file criminal revision and the Court can excise this power of criminal revision suo motu.</p>", bn: "<p>ফৌজদারী রিভিশন নিষ্পত্তির ক্ষেত্রে দায়রা আদালত ও হাইকোর্ট বিভাগ উভয়ের সমবর্তী ক্ষমতা রয়েছে দেওয়ানী আদালতের মত ফৌজদারী আদালতে দ্বিতীয় রিভিশন করার সুঝোগ নেই। তৃতীয় পক্ষের ফৌজদারী রিভিশনের আবেদন করতে পারে। আদালত নিজ উদ্দ্যেগে (sou moto) ফৌজদারী রিভিশন ক্ষমতা পরিচালনা করতে পারে।</p>" },
    cases: { en: "<ol><li><p><strong>Majedur Rahman versus State, Criminal Revision No. 1110 of 2019</strong></p><p>(On behalf of the Accused-Petitioner, Petitioner challenged the Charge Framing Order, the High Court Division was pleased to issue Rule and Stay)</p></li><li><p><strong>Md. Asad Uddin and others versus State and others Criminal Revision No. 1146 of 2020</strong></p><p>(On behalf of the  Petitioners, In this case, 10 Lawyers of the Supreme Court of Bangladesh challenged the disputed confessional statement of the accused who had implicated themselves in rape and killing a girl who subsequently appeared before the Court in Narayanganj.), News Link</p></li><li><p><strong>Md. Moti Matbor versus State, 73 DLR 89</strong></p><p>(On behalf of the Convict-Petitioner, High Court Division granted probation to the petitioner who was found guilty under the Narcotics Control Act for the first time.) News Link</p></li><li><p><strong>Sheikh Didar Hossain and others versus the State, Criminal Revision No. 260 Of 2020</strong></p><p>(On behalf of the Accused-Petitioner, Petitioner challenged the Charge Framing Order, the High Court Division was pleased to issue Rule and Stay)</p></li><li><p><strong>Abul Kalam and others versus the State, Criminal Revision No. 1154 of 2020</strong></p><p>(On behalf of the Accused-Petitioner, Petitioner challenged the Charge Framing Order, the High Court Division was pleased to issue Rule and Stay)</p></li><li><p><strong>Md. Zillur Rahman and others versus State, Criminal Revision No. 538 of 2021</strong></p><p>(On behalf of the Accused-Petitioner, Petitioner challenged the Charge Framing Order, the High Court Division was pleased to issue Rule and Stay)</p></li><li><p><strong>Ahmed Abdullah Khan and others versus State, Criminal Revision No. 1380 of 2021</strong></p><p>(On behalf of the Petitioners, In this case some of the Advocates of Supreme Court brought a Bogura Shishu Case to notice of the High Court Division under criminal revisional jurisdiction. In the Shishu Case, brother of victim was implicated for killing his brother. The Police retracted confessional statement by means of torture. The said police officer has been debarred from investigating functions.) News Link</p></li></ol>", bn: "<p><br></p><p><br></p>" },
  },
  {
    id: "criminal-review",
    category: "criminal",
    position: 8,
    title: { en: "Criminal Review", bn: "ফৌজদারী রিভিউ বা পূণর্বিবেচনা" },
    excerpt: { en: "Only the Appellate Division can review its own Judgment and Order under Article 105 of the Constitution of the People’s Republic of Bangladesh.", bn: "সংবিধানের অনু্চ্ছেদ ১০৫ এ প্রদত্ত ক্ষমতা বলে শুধুমাত্র সুপ্রিম কোর্টের আপীল বিভাগ তাদের রায় ও আদেশ পূণর্বিবেচনা করতে পারে।" },
    body: { en: "<p>Only the Appellate Division can review its own Judgment and Order under Article 105 of the Constitution of the People’s Republic of Bangladesh.</p>", bn: "<p>সংবিধানের অনু্চ্ছেদ ১০৫ এ প্রদত্ত ক্ষমতা বলে শুধুমাত্র সুপ্রিম কোর্টের আপীল বিভাগ তাদের রায় ও আদেশ পূণর্বিবেচনা করতে পারে।</p>" },
    cases: { en: "<ol><li><p><strong>Shafiul Azam alias Azam and another versus the State, Criminal Review Petition No. 52 of 2021</strong></p><p>(On behalf of the Petitioner- Pending before the Appellate Division for hearing)</p></li><li><p><strong>Ataur Mridha vs State, Criminal Review Petition No. 52 of 2021, 73 DLR (AD) 298</strong></p><p>(On behalf of the Petitioner, Imprisonment for the rest of natural life commuted to imprisonment for life, Meaning of Imprisonment for life)</p></li></ol>", bn: "<ol><li><p><strong>Shafiul Azam alias Azam and another versus the State, Criminal Review Petition No. 52 of 2021</strong></p><p>(On behalf of the Petitioner- Pending before the Appellate Division for hearing)</p></li><li><p><strong>Ataur Mridha vs State, Criminal Review Petition No. 52 of 2021, 73 DLR (AD) 298</strong></p><p>(On behalf of the Petitioner, Imprisonment for the rest of natural life commuted to imprisonment for life, Meaning of Imprisonment for life)</p></li></ol>" },
  },
  {
    id: "bail",
    category: "criminal",
    position: 9,
    title: { en: "Bail", bn: "জামিন" },
    excerpt: { en: "An accused in jail custody may file application in subordinate Court or the High Court Division for bail during investigation, inquiry, or trial.", bn: "তদন্ত, অনুসন্ধান বা বিচার চলাকালে হাজতী আসামী অদস্তন আদালত বা হাইকোর্ট বিভাগে জামিনের আবেদন করতে পারেন জামিন যোগ্য অপরাধ জামিন পাওয়া অভিযুক্ত..." },
    body: { en: "<p>An accused in jail custody may file application in subordinate Court or the High Court Division for bail during investigation, inquiry, or trial. Bail in bailable offences is right whereas bail in non bailable offences is the the discretion of the Court.</p>", bn: "<p>তদন্ত, অনুসন্ধান বা বিচার চলাকালে হাজতী আসামী অদস্তন আদালত বা হাইকোর্ট বিভাগে জামিনের আবেদন করতে পারেন জামিন যোগ্য জামিন পাওয়া অভিযুক্ত ব্যক্তির অধিকার। জামিন অযোগ্য অপরাধে জামিন প্রদান আদালতের এখতিয়ার।</p>" },
    cases: { en: "<p><br><br></p><p><strong>1. Md. Hasanul Banna versus State, Criminal Miscellaneous Case No. 31570 Of 2018</strong></p><p>(On behalf of the Accused-Petitioner, the Accused-Petitioner was alleged under the Digital Security Act<strong>. </strong>He moved to High Court Division for bail. After hearing at length, the Court enlarged him on bail.)</p><p><strong>2.   Md. Momen Moksed versus State and another, Criminal Miscellaneous Case No. 35878 of 2018</strong></p><p><strong> </strong>(On behalf of the Accused-Petitioner, the Accused-Petitioner was implicated in a Anti-Corruption Case<strong>. </strong>He moved to High Court Division for bail. After hearing at length, the Court enlarged him on bail.)</p><p><strong>3.   A.N.M. Shamsul Islam versus State, Criminal Miscellaneous Case No. 54507  of  2018</strong></p><p>(On behalf of the Accused-Petitioner, the Accused-Petitioner was implicated in a political case<strong>. </strong>He moved to High Court Division for bail. After hearing at length, the Court enlarged him on bail.)</p><p><strong>4.  Barrister Zubayer Ahmed Bhuiyan vs State, Criminal Miscellaneous Case No. 324 of 2019</strong></p><p>(On behalf of the Accused-Petitioner , the Accused-Petitioner was implicated in a political case<strong>. </strong>He moved to High Court Division for bail. After hearing at length, the Court enlarged him on bail.)</p><p><strong>5.   A.H.M. Hamidur Rahman Azad versus State, Criminal Miscellaneous Case No. 9943 of 2019</strong></p><p>(On behalf of the Accused-Petitioner, the Accused-Petitioner was implicated in a political case<strong>. </strong>He moved to High Court Division for bail. After hearing at length, the Court enlarged him on bail.)</p><p><strong>6.  Professor Harun Or Rashid versus State, Criminal Miscellaneous Case No. 33365 of 2018</strong></p><p>(The Accused-Petitioner was implicated under the Special Powers Act, 1974. The Accused-Petitioner moved to High Court Division for bail. The High Court Division granted him ad interim bail.</p>", bn: "<p><br><br></p><p><strong>1. Md. Hasanul Banna versus State, Criminal Miscellaneous Case No. 31570 Of 2018</strong></p><p>(On behalf of the Accused-Petitioner, the Accused-Petitioner was alleged under the Digital Security Act<strong>. </strong>He moved to High Court Division for bail. After hearing at length, the Court enlarged him on bail.)</p><p><strong>2.   Md. Momen Moksed versus State and another, Criminal Miscellaneous Case No. 35878 of 2018</strong></p><p><strong> </strong>(On behalf of the Accused-Petitioner, the Accused-Petitioner was implicated in a Anti-Corruption Case<strong>. </strong>He moved to High Court Division for bail. After hearing at length, the Court enlarged him on bail.)</p><p><strong>3.   A.N.M. Shamsul Islam versus State, Criminal Miscellaneous Case No. 54507  of  2018</strong></p><p>(On behalf of the Accused-Petitioner, the Accused-Petitioner was implicated in a political case<strong>. </strong>He moved to High Court Division for bail. After hearing at length, the Court enlarged him on bail.)</p><p><strong>4.  Barrister Zubayer Ahmed Bhuiyan vs State, Criminal Miscellaneous Case No. 324 of 2019</strong></p><p>(On behalf of the Accused-Petitioner , the Accused-Petitioner was implicated in a political case<strong>. </strong>He moved to High Court Division for bail. After hearing at length, the Court enlarged him on bail.)</p><p><strong>5.   A.H.M. Hamidur Rahman Azad versus State, Criminal Miscellaneous Case No. 9943 of 2019</strong></p><p>(On behalf of the Accused-Petitioner, the Accused-Petitioner was implicated in a political case<strong>. </strong>He moved to High Court Division for bail. After hearing at length, the Court enlarged him on bail.)</p><p><strong>6.  Professor Harun Or Rashid versus State, Criminal Miscellaneous Case No. 33365 of 2018</strong></p><p>(The Accused-Petitioner was implicated under the Special Powers Act, 1974. The Accused-Petitioner moved to High Court Division for bail. The High Court Division granted him ad interim bail.</p>" },
  },
  {
    id: "bail-in-pending-appeal",
    category: "criminal",
    position: 10,
    title: { en: "Bail in Pending Appeal", bn: "বিচারাধীন আপীলে জামিন" },
    excerpt: { en: "A convict-accused may seek bail in pending Criminal Appeal. The Court may allow his application for bail.", bn: "আপীল নিষ্পত্তি কালীন সময়ে দণ্ডপ্রাপ্ত আসামী জামিন আবেদন করতে পারেন। উক্ত আবেদনের প্রেক্ষিতে আদালত জামিন মঞ্জুর করতে পারে।" },
    body: { en: "<p>A convict-accused may seek bail in pending Criminal Appeal. The Court may allow his application for bail. </p>", bn: "<p>আপীল নিষ্পত্তি কালীন সময়ে দণ্ডপ্রাপ্ত আসামী জামিন আবেদন করতে পারেন। উক্ত আবেদনের প্রেক্ষিতে আদালত জামিন মঞ্জুর করতে পারে।</p>" },
    cases: { en: "<ol><li><p><strong>Faruk Ahammed versus State, Criminal Appeal No. 1585 of 2019</strong></p><p>(The Appellant was convicted to imprisonment for life. He preferred appeal against the judgment of conviction and sentence. He also filed an application for bail during pendency of appeal. The Court allowed application for bail.)</p></li><li><p><strong>Md. Ferdous Ahmed and others, Criminal Appeal No. 1198 of 2019</strong></p><p>(Three appellants were convicted under section 302 of the Penal Code, 1860 and sentenced to imprisonment for life. On the prayer of the Appellants, the High Court Division enlarged them on bail till disposal of the appeal.)</p></li><li><p><strong>Juti @ Joti and another versus state, Criminal Appeal No. 14656 of 2019</strong></p><p>(The Appellants were sentenced to imprisonment for life. During the pendency of appeal, the High Court Division enlarged them on bail)</p></li></ol><p><strong> </strong></p>", bn: "<ol><li><p><strong>Faruk Ahammed versus State, Criminal Appeal No. 1585 of 2019</strong></p><p>(The Appellant was convicted to imprisonment for life. He preferred appeal against the judgment of conviction and sentence. He also filed an application for bail during pendency of appeal. The Court allowed application for bail.)</p></li><li><p><strong>Md. Ferdous Ahmed and others, Criminal Appeal No. 1198 of 2019</strong></p><p>(Three appellants were convicted under section 302 of the Penal Code, 1860 and sentenced to imprisonment for life. On the prayer of the Appellants, the High Court Division enlarged them on bail till disposal of the appeal.)</p></li><li><p><strong>Juti @ Joti and another versus state, Criminal Appeal No. 14656 of 2019</strong></p><p>(The Appellants were sentenced to imprisonment for life. During the pendency of appeal, the High Court Division enlarged them on bail)</p></li></ol><p><strong> </strong></p>" },
  },
  {
    id: "bail-in-pending-rule",
    category: "criminal",
    position: 11,
    title: { en: "Bail in pending Rule", bn: "রুল শুনানি পর্যায়ে জামিন" },
    excerpt: { en: "When an application is moved before High Court Division, the Court can issue Rule asking the respondent or opposite parties as to why the...", bn: "রুল শুনানি পর্যায়ে জামিন" },
    body: { en: "<p><span>When an application is moved before High Court Division, the Court can issue Rule asking the respondent or opposite parties as to why the relief sought should not be granted. It requires hearing at length. During this period, the Petitioner can pray for bail in pending rule.</span></p>", bn: "<p><span>When an application is moved before High Court Division, the Court can issue Rule asking the respondent or opposite parties as to why the relief sought should not be granted. It requires hearing at length. During this period, the Petitioner can pray for bail in pending rule.</span></p>" },
    cases: { en: "<ol><li><p><strong><span>Md. Shaharia Ahmed Prokash @ Shaharul versus the State<u> Criminal Miscellaneous Case No. 38681 of 2021.</u></span></strong></p><p><span>The convict-petitioner preferred above mentioned  Criminal Miscellaneous Case against the Judgment and Order dated 10.03.2020 passed by the Court of Shishu Adalot, Sunamganj in Shishu Case No. 01 of 2020 arising out of Derai Police Station Case No. 02 dated 14.10.2019 (corresponding to GR No. 124 of 2019) convicting the petitioner under sections 302 and 34 of the Penal Code, 1860 and sentencing him for a period of 8 (eight) years. The Case is pending before the Supreme Court of Bangladesh. </span></p></li></ol>", bn: "<ol><li><p><strong><span>Md. Shaharia Ahmed Prokash @ Shaharul versus the State<u> Criminal Miscellaneous Case No. 38681 of 2021.</u></span></strong></p><p><span>The convict-petitioner preferred above mentioned  Criminal Miscellaneous Case against the Judgment and Order dated 10.03.2020 passed by the Court of Shishu Adalot, Sunamganj in Shishu Case No. 01 of 2020 arising out of Derai Police Station Case No. 02 dated 14.10.2019 (corresponding to GR No. 124 of 2019) convicting the petitioner under sections 302 and 34 of the Penal Code, 1860 and sentencing him for a period of 8 (eight) years. The Case is pending before the Supreme Court of Bangladesh. </span></p></li></ol>" },
  },
  {
    id: "anticipatory-bail",
    category: "criminal",
    position: 12,
    title: { en: "Anticipatory Bail/ Pre- arrest Bail", bn: "আগাম জামিন" },
    excerpt: { en: "A person whether accused or not may surrender before the High Court Division and seek anticipatory bail or pre-arrest bail apprehending arrest.", bn: "অভিযুক্ত আসামী হাইকোর্ট বিভাগে আত্মসমর্পন পূর্বক আগাম জামিনের প্রার্থনা করতে পারেন মূলত গ্রেফতার হওয়া থেকে আইনী প্রক্রিয়ায় নিজেকে রক্ষার..." },
    body: { en: "<p>A person whether accused or not may surrender before the High Court Division and seek anticipatory bail or pre-arrest bail apprehending arrest.</p>", bn: "<p>অভিযুক্ত আসামী হাইকোর্ট বিভাগে আত্মসমর্পন পূর্বক আগাম জামিনের প্রার্থনা করতে পারেন মূলত গ্রেফতার হওয়া থেকে আইনী প্রক্রিয়ায় নিজেকে রক্ষার জন্য উক্ত জামিন নেয়া হয়।</p>" },
    cases: { en: "<ol><li><p><strong>Prof. Mia Golam Parwar versus State, Criminal Miscellaneous Case No. 46489 of 2018</strong></p><p>(The Accused-Petitioner was a political leader and a member of the parliament. He was implicated in a political case. He moved to the High Court Division for anticipatory bail. The Court granted him anticipatory bail.)</p></li><li><p><strong>Abdul Ahad versus State, Criminal Miscellaneous Case No. 45411 of 2021</strong></p><p>(The Accused-Petitioner was granted anticipatory bail after the submission of the Charge Sheet.</p></li><li><p><strong>The State vs. Professor Morshed Hasan Khan and Ors, 71 DLR (AD) 364</strong></p><p>(Latest case providing guidelines on anticipatory bail)</p></li></ol>", bn: "<ol><li><p><strong>Prof. Mia Golam Parwar versus State, Criminal Miscellaneous Case No. 46489 of 2018</strong></p><p>(The Accused-Petitioner was a political leader and a member of the parliament. He was implicated in a political case. He moved to the High Court Division for anticipatory bail. The Court granted him anticipatory bail.)</p></li><li><p><strong>Abdul Ahad versus State, Criminal Miscellaneous Case No. 45411 of 2021</strong></p><p>(The Accused-Petitioner was granted anticipatory bail after the submission of the Charge Sheet.</p></li><li><p><strong>The State vs. Professor Morshed Hasan Khan and Ors, 71 DLR (AD) 364</strong></p><p>(Latest case providing guidelines on anticipatory bail)</p></li></ol>" },
  },
  {
    id: "quashment",
    category: "criminal",
    position: 13,
    title: { en: "Quashment", bn: "মামলা বাতিল" },
    excerpt: { en: "An accused may come before the High Court Division under section 561A of the CrPC for quashing the proceedings of the criminal case.", bn: "ফৌজদারী কার্যবিধির ৫৬১ ক ধারার অধীনে একজন অভিযুক্ত ব্যাক্তি হাইকোর্ট বিভাগে মামলার কার্যধারা বাতিল চেয়ে আবেদন করতে পারেন।" },
    body: { en: "<p>An accused may come before the High Court Division under section 561A of the CrPC for quashing the proceedings of the criminal case.</p>", bn: "<p>ফৌজদারী কার্যবিধির ৫৬১ ক ধারার অধীনে একজন অভিযুক্ত ব্যাক্তি হাইকোর্ট বিভাগে মামলার কার্যধারা বাতিল চেয়ে আবেদন করতে পারেন।</p>" },
    cases: { en: "<ol><li><p><strong>Babul Hawlader  versus State, Criminal Miscellaneous Case No. 53239 of 2018</strong></p><p>(The Convict-Petitioner challenged the judgment and Order of the Tribunal under section 561A of CrPC. The High Court Division granted Rule and Stay.)</p></li><li><p><strong>Mamunur Rashid Nur versus Criminal Miscellaneous Case. 31662 of 2021</strong></p><p>(The Accused-Petitioner came to the High Court Division to quash the proceedings on the ground that the same is barred by law. The Court was pleased to issue Rule and Stay.)</p></li><li><p><strong>Md. Yunus Munchi verus State and others, Criminal Miscellaneous Case.</strong> <strong>16779 of 202</strong></p><p>(An apprentice Advocate of Barisal Bar Association was allegedly beaten to death in police custody. Father of the victim Yunus Munchi filed a criminal against some police officers under Prevention of Torture and Custodial Death (Prevention) Act, 2013 read with sections 302/34 of the Penal Code, 1860. The father moved to the High Court Division under sections 561A of CrPC and sought judicial inquiry of the case. The High Court Division ordered for judicial inquiry). News Link</p></li><li><p><strong>Lipon Patwary versus State, Criminal Miscellaneous Case No.</strong> <strong>12198 of 2021</strong></p><p>(The accused-petitioner was denied bail by the Sessions Court considering the confessional statement during investigation stage. He applied for the certified copy of the confessional statement but the same was denied by the concerned Court. He preferred an application under section 561A of the CrPC challenging the denial of the lower Court. The High Court Division issued Rule asking the Respondent to show cause of denial.)News Link</p></li><li><p><strong>Engineer Md. Toufique Hasan versus State, Criminal Miscellaneous Case No. 1366 of 2021</strong></p><p>(The accused-petitioner moved to the High Court Division challenging the proceedings of a criminal case filed out of political vendetta. The Court issued Rule and Stay)</p></li></ol>", bn: "<ol><li><p><strong>Babul Hawlader  versus State, Criminal Miscellaneous Case No. 53239 of 2018</strong></p><p>(The Convict-Petitioner challenged the judgment and Order of the Tribunal under section 561A of CrPC. The High Court Division granted Rule and Stay.)</p></li><li><p><strong>Mamunur Rashid Nur versus Criminal Miscellaneous Case. 31662 of 2021</strong></p><p>(The Accused-Petitioner came to the High Court Division to quash the proceedings on the ground that the same is barred by law. The Court was pleased to issue Rule and Stay.)</p></li><li><p><strong>Md. Yunus Munchi verus State and others, Criminal Miscellaneous Case.</strong> <strong>16779 of 202</strong></p><p>(An apprentice Advocate of Barisal Bar Association was allegedly beaten to death in police custody. Father of the victim Yunus Munchi filed a criminal against some police officers under Prevention of Torture and Custodial Death (Prevention) Act, 2013 read with sections 302/34 of the Penal Code, 1860. The father moved to the High Court Division under sections 561A of CrPC and sought judicial inquiry of the case. The High Court Division ordered for judicial inquiry). News Link</p></li><li><p><strong>Lipon Patwary versus State, Criminal Miscellaneous Case No.</strong> <strong>12198 of 2021</strong></p><p>(The accused-petitioner was denied bail by the Sessions Court considering the confessional statement during investigation stage. He applied for the certified copy of the confessional statement but the same was denied by the concerned Court. He preferred an application under section 561A of the CrPC challenging the denial of the lower Court. The High Court Division issued Rule asking the Respondent to show cause of denial.)News Link</p></li><li><p><strong>Engineer Md. Toufique Hasan versus State, Criminal Miscellaneous Case No. 1366 of 2021</strong></p><p>(The accused-petitioner moved to the High Court Division challenging the proceedings of a criminal case filed out of political vendetta. The Court issued Rule and Stay)</p></li></ol>" },
  },
  {
    id: "transfer-of-cases",
    category: "criminal",
    position: 14,
    title: { en: "Transfer of Cases", bn: "মামলা স্থানান্তর" },
    excerpt: { en: "The High Court Division may transfer any criminal case from any criminal Court to another criminal Court. The Sessions Judge may transfer any criminal case...", bn: "হাইকোর্ট বিভাগ যেকোন ফৌজদারী মামলা একটি ফৌজদারী আদালতে স্থানান্তর করতে পারে। দায়রা আদালত তার অধীনস্ত এক আদালত থেকে অন্য আদালতে ফৌজদারী..." },
    body: { en: "<p>The High Court Division may transfer any criminal case from any criminal Court to another criminal Court. The Sessions Judge may transfer any criminal case in his Sessions Division.</p>", bn: "<p>হাইকোর্ট বিভাগ যেকোন ফৌজদারী মামলা একটি ফৌজদারী আদালতে স্থানান্তর করতে পারে। দায়রা আদালত তার অধীনস্ত এক আদালত থেকে অন্য আদালতে ফৌজদারী মামলা স্থানান্তর করতে পারে।</p>" },
    cases: { en: "<ol><li><p><strong>Lutfur Rahman versus the State and another </strong></p><p>The Petitioner filed application under section 526 of the Code of Criminal Procedure, 1898 for transfer of Police Case from Norail to Gaibandha.</p></li></ol>", bn: "<ol><li><p><strong>Lutfur Rahman versus the State and another </strong></p><p>The Petitioner filed application under section 526 of the Code of Criminal Procedure, 1898 for transfer of Police Case from Norail to Gaibandha.</p></li></ol>" },
  },
  {
    id: "retrial",
    category: "criminal",
    position: 15,
    title: { en: "Retrial", bn: "পূণঃবিচার" },
    excerpt: { en: "In appeal or revision, the Superior Court may set aside the judgment and Order and send the case for fresh trial.", bn: "আপীল ও রিভিশন আদালত অদস্তন আদালতের রায় ও আদেশ বাতিল করতে পারে এবং নতুন বিচারের জন্য পূণরায় প্রেরণ করতে পারে।" },
    body: { en: "<p>In appeal or revision, the Superior Court may set aside the judgment and Order and send the case for fresh trial.</p>", bn: "<p>আপীল ও রিভিশন আদালত অদস্তন আদালতের রায় ও আদেশ বাতিল করতে পারে এবং নতুন বিচারের জন্য পূণরায় প্রেরণ করতে পারে।</p>" },
    cases: { en: "<ol><li><p><strong><span>Md. Abu Taleb, <u>Criminal Revision No. 471 of 2021</u></span></strong></p><p><span>The Accused was convicted under Table 9(Kha) of section 19(1) of the Madhak Drabbya Niyantron Ain, 1990 and was sentenced to suffer imprisonment for a period of 5(five) and also to pay fine of Tk. 5, 000/- by the trial Court. He filed criminal revision before the High Court Division. The High Court Division sent the case for retrial.</span></p></li></ol>", bn: "<ol><li><p><strong><span>Md. Abu Taleb, <u>Criminal Revision No. 471 of 2021</u></span></strong></p><p><span>The Accused was convicted under Table 9(Kha) of section 19(1) of the Madhak Drabbya Niyantron Ain, 1990 and was sentenced to suffer imprisonment for a period of 5(five) and also to pay fine of Tk. 5, 000/- by the trial Court. He filed criminal revision before the High Court Division. The High Court Division sent the case for retrial.</span></p></li></ol>" },
  },
  {
    id: "narcotics-and-drugs",
    category: "criminal",
    position: 16,
    title: { en: "Narcotics and Drugs", bn: "মাদকদ্রব্য নিয়ন্ত্রণ" },
    excerpt: { en: "Narcotic Drugs Control Laws provide special procedure to deal with the offences relating to illegal drugs dealing. The Law Emporium conducted cases under this special...", bn: "মাদক দ্রব্য নিয়ন্ত্রণ আইনে অবৈধ মাদক দ্রব্য সংক্রান্ত সংগঠিত অপরাধ সমূহ বিচারের ক্ষেত্রে বিশেষ প্রক্রিয়া বর্ণিত হয়েছে। দ্য ল’ এম্পোরিয়াম এই বিশেষ.." },
    body: { en: "<p>Narcotic Drugs Control Laws provide special procedure to deal with the offences relating to illegal drugs dealing. The Law Emporium conducted cases under this special law and successfully disposed of the same.</p>", bn: "<p>মাদক দ্রব্য নিয়ন্ত্রণ আইনে অবৈধ মাদক দ্রব্য সংক্রান্ত সংগঠিত অপরাধ সমূহ বিচারের ক্ষেত্রে বিশেষ প্রক্রিয়া বর্ণিত হয়েছে। দ্য ল’ এম্পোরিয়াম এই বিশেষ আইনের অধীনে দায়ের কৃত বেশ কিছু বিখ্যাত মামলা পরিচালনা করেছে।</p>" },
    cases: { en: "<ol><li><p><strong><span>Md. Moti Matbor versus State, <u>73 DLR 89</u></span></strong></p><p><span>(On behalf of the Convict-Petitioner, High Court Division granted probation to the petitioner who was found guilty under the Narcotics Control Act for the first time.) News Link</span></p></li><li><p><strong><span> Md. Abu Taleb, <u>Criminal Revision No. 471 of 2021</u></span></strong></p><p><span>The Accused was convicted under Table 9(Kha) of section 19(1) of the Madhak Drabbya Niyantron Ain, 1990 and sentencing him to suffer imprisonment for a period of 5(five) and also to pay fine of Tk. 5, 000/- by the trial Court. He filed criminal revision before the High Court Division. The High Court Division sent the case for retrial.</span></p></li><li><p><strong><span>Md. Khairul versus the State,<u> Criminal Appeal Case No. 3094 of 2021</u></span></strong></p><p><span>The Accused was convicted under Table 9(Kha) of section 19(1) of the Madhak Drabbya Niyantron Ain, 1990 and sentencing him to suffer imprisonment for a period of 7(seven) and also to pay fine of Tk. 10, 000/- by the trial Court. He filed appeal before the High Court Division. The Appellate Court acquitted the convict on the ground that the seized narcotics had been produced before the trial Court destroyed before the conclusion of trial.</span></p></li></ol>", bn: "<ol><li><p><strong><span>Md. Moti Matbor versus State, <u>73 DLR 89</u></span></strong></p><p><span>(On behalf of the Convict-Petitioner, High Court Division granted probation to the petitioner who was found guilty under the Narcotics Control Act for the first time.) News Link</span></p></li><li><p><strong><span> Md. Abu Taleb, <u>Criminal Revision No. 471 of 2021</u></span></strong></p><p><span>The Accused was convicted under Table 9(Kha) of section 19(1) of the Madhak Drabbya Niyantron Ain, 1990 and sentencing him to suffer imprisonment for a period of 5(five) and also to pay fine of Tk. 5, 000/- by the trial Court. He filed criminal revision before the High Court Division. The High Court Division sent the case for retrial.</span></p></li><li><p><strong><span>Md. Khairul versus the State,<u> Criminal Appeal Case No. 3094 of 2021</u></span></strong></p><p><span>The Accused was convicted under Table 9(Kha) of section 19(1) of the Madhak Drabbya Niyantron Ain, 1990 and sentencing him to suffer imprisonment for a period of 7(seven) and also to pay fine of Tk. 10, 000/- by the trial Court. He filed appeal before the High Court Division. The Appellate Court acquitted the convict on the ground that the seized narcotics had been produced before the trial Court destroyed before the conclusion of trial.</span></p></li></ol>" },
  },
  {
    id: "cyber-crimes-cyber-law-digital-security",
    category: "criminal",
    position: 17,
    title: { en: "Cyber Crimes/ Cyber Law/ Digital Security", bn: "ডিজিটাল নিরাপত্তা/সাইবার অপরাধ" },
    excerpt: { en: "Modern age is the era of Information Technology and Cyber World. Cyber Laws aim to handle cyber crimes and protect digital security.", bn: "বর্তমান যুগে তথ্য প্রযুক্তির অবাধ বিচরণ হচ্ছে। সাইবার জগতে (cyber world) সংগঠিত অপরাধ প্রতিরোধে ডিজিটাল নিরাপত্তা আইন প্রণয়ন করা হয়েছে। আমাদের চেম্বার এই..." },
    body: { en: "<p>Modern age is the era of Information Technology and Cyber World. Cyber Laws aim to handle cyber crimes and protect digital security. This chamber has experienced in dealing cases arising out of the above.</p>", bn: "<p>বর্তমান যুগে তথ্য প্রযুক্তির অবাধ বিচরণ হচ্ছে। সাইবার জগতে (cyber world) সংগঠিত অপরাধ প্রতিরোধে ডিজিটাল নিরাপত্তা আইন প্রণয়ন করা হয়েছে। আমাদের চেম্বার এই আইনে দায়ের কৃত উল্লেখ যোগ্য কিছু মামলা দক্ষতার সাথে পরিচালনা করেছে।</p>" },
    cases: { en: "<ol><li><p><strong><span>Md. Abul Asad verus the State, <u>Criminal Misc No. 2429 Of 2020</u></span></strong></p><p><span>The accused-petitioner filed this application for bail in connection with Hatirjheel Police Station Case No. 24 dated 14.12. under sections 21, 31 and 35 of the ডিজিটাল নিরাপত্তা আইন, ২০১৮ read with section 124A of the Penal Code, 1860. The High Court Division granted him bail and the Appellate Division affirmed the Order of the High Court Division.</span></p></li><li><p><strong><span>Dr. Md. Nurul Amin Chowdhury versu the State,<u> Criminal Appeal No. 8911 of 2021</u></span></strong></p><p><span>The Accused-Appellant was implicated in a case under sections 29(1) and 31(2) of ডিজিটাল নিরাপত্তা আইন, ২০১৮. The Accused-Appellant was granted bail by the High Court Division. Thereafter he moved to the High Court Division challenging the charge framing Order.</span></p></li></ol>", bn: "<ol><li><p><strong><span>Md. Abul Asad verus the State, <u>Criminal Misc No. 2429 Of 2020</u></span></strong></p><p><span>The accused-petitioner filed this application for bail in connection with Hatirjheel Police Station Case No. 24 dated 14.12. under sections 21, 31 and 35 of the ডিজিটাল নিরাপত্তা আইন, ২০১৮ read with section 124A of the Penal Code, 1860. The High Court Division granted him bail and the Appellate Division affirmed the Order of the High Court Division.</span></p></li><li><p><strong><span>Dr. Md. Nurul Amin Chowdhury versu the State,<u> Criminal Appeal No. 8911 of 2021</u></span></strong></p><p><span>The Accused-Appellant was implicated in a case under sections 29(1) and 31(2) of ডিজিটাল নিরাপত্তা আইন, ২০১৮. The Accused-Appellant was granted bail by the High Court Division. Thereafter he moved to the High Court Division challenging the charge framing Order.</span></p></li></ol>" },
  },
  {
    id: "anti-corruption-and-money-laundering",
    category: "criminal",
    position: 18,
    title: { en: "Anti-Corruption and Money Laundering", bn: "দূর্নীতি দমন ও মানি লন্ডারিং/অর্থপাচার" },
    excerpt: { en: "White collar crimes are the ever present spectator of the capitalist society. Corruption and Money Laundering are the burning issues.", bn: "দূর্নীতি ও অর্থ পাচার সংক্রান্ত অপরাধ দেশে একটি অন্যতম ও ভয়াবহ সমস্যা। দ্য ল’ এম্পোরিয়াম এ সংক্রান্তে সংক্ষুব্দ ব্যাক্তিকে যথাযথ আইনী প্রতিকারের পরামর্শ প্রদান করে।" },
    body: { en: "<p>White collar crimes are the ever present spectator of the capitalist society. Corruption and Money Laundering are the burning issues. The Law Emporium provides solution to the aggrieved in this regard.</p>", bn: "<p>দূর্নীতি ও অর্থ পাচার সংক্রান্ত অপরাধ দেশে একটি অন্যতম ও ভয়াবহ সমস্যা। দ্য ল’ এম্পোরিয়াম এ সংক্রান্তে সংক্ষুব্দ ব্যাক্তিকে যথাযথ আইনী প্রতিকারের পরামর্শ প্রদান করে।</p>" },
    cases: { en: "<p><strong><span>1. Mohammad Yousuf Chowdhury, Criminal Misc Case No. 30226 of 2021</span></strong></p><p><span>(On behalf of the Accused-Petitioner, the Accused-Petitioner, a custom officer,  was implicated in an Anti-Corruption Case</span><strong><span>. </span></strong><span>He moved to High Court Division for bail. After hearing at length, the Court enlarged him on bail.)</span></p><p><strong><span>2. Md. Momen Moksed versus State and another, Criminal Miscellaneous Case No. 35878 of 2018</span></strong></p><p><span>(On behalf of the Accused-Petitioner, the Accused-Petitioner, a custom officer,  was implicated in an Anti-Corruption Case</span><strong><span>. </span></strong><span>He moved to High Court Division for bail. After hearing at length, the Court enlarged him on bail.)</span></p><p><span>3.  </span><strong><span>Criminal Appeal No.  2077  of 2021</span></strong></p><p><span>(On behalf of the Accused-Petitioners. They came before the High Court Division to challenge the Order No. 5  dated 05.01.2021 passed by the learned Special Judge, Special Judge Court No. 7, Dhaka framing charge against the Accused-Appellants under section 4(2) of the Money Laundering Prevention Act, 2012.</span></p>", bn: "<p><strong><span>1. Mohammad Yousuf Chowdhury, Criminal Misc Case No. 30226 of 2021</span></strong></p><p><span>(On behalf of the Accused-Petitioner, the Accused-Petitioner, a custom officer,  was implicated in an Anti-Corruption Case</span><strong><span>. </span></strong><span>He moved to High Court Division for bail. After hearing at length, the Court enlarged him on bail.)</span></p><p><strong><span>2. Md. Momen Moksed versus State and another, Criminal Miscellaneous Case No. 35878 of 2018</span></strong></p><p><span>(On behalf of the Accused-Petitioner, the Accused-Petitioner, a custom officer,  was implicated in an Anti-Corruption Case</span><strong><span>. </span></strong><span>He moved to High Court Division for bail. After hearing at length, the Court enlarged him on bail.)</span></p><p><span>3.  </span><strong><span>Criminal Appeal No.  2077  of 2021</span></strong></p><p><span>(On behalf of the Accused-Petitioners. They came before the High Court Division to challenge the Order No. 5  dated 05.01.2021 passed by the learned Special Judge, Special Judge Court No. 7, Dhaka framing charge against the Accused-Appellants under section 4(2) of the Money Laundering Prevention Act, 2012.</span></p>" },
  },
  {
    id: "domestic-violence",
    category: "criminal",
    position: 19,
    title: { en: "Domestic Violence", bn: "পারিবারিক সহিংসতা" },
    excerpt: { en: "There are a number of cases relating to offences of violence against women. The Law Emporium represents the aggrieved party to the case.", bn: "দ্য ল’ এম্পোরিয়াম পারিবারিক সহিংসতা সম্পর্কিত অসংখ্য মামলা দক্ষতার সাথে পরিচালনা করেছে।" },
    body: { en: "<p>There are a number of cases relating to offences of violence against women. The Law Emporium represents the aggrieved party to the case.</p>", bn: "<p>দ্য ল’ এম্পোরিয়াম পারিবারিক সহিংসতা সম্পর্কিত অসংখ্য মামলা দক্ষতার সাথে পরিচালনা করেছে।</p>" },
    cases: { en: "<ol><li><p><strong>Md. Toki Uddin @ Abuiya, Criminal Appeal No. 379 Of 2020</strong></p><p>The applicant was implicated under section 11(Ga) of the Nari-O-Shishu Nirjatan Daman Ain, 2000. He moved to High Court Division for bail. The Court granted him ad interim bail.</p></li><li><p><strong>Ayub Khan versus the State, Criminal Misc Case No. 26936 Of 2020</strong></p><p>The Petitioner filed an application under section 561A of the Code of Criminal Procedure challenging the proceedings under section 11(Ga) of the Nari-O-Shishu Nirjatan Daman Ain, 2000 before the High Court Division of the Supreme Court of Bangladesh. The Court was pleased to Issue Rule and stayed the further proceedings of the case.</p></li></ol>", bn: "<ol><li><p><strong>Md. Toki Uddin @ Abuiya, Criminal Appeal No. 379 Of 2020</strong></p><p>The applicant was implicated under section 11(Ga) of the Nari-O-Shishu Nirjatan Daman Ain, 2000. He moved to High Court Division for bail. The Court granted him ad interim bail.</p></li><li><p><strong>Ayub Khan versus the State, Criminal Misc Case No. 26936 Of 2020</strong></p><p>The Petitioner filed an application under section 561A of the Code of Criminal Procedure challenging the proceedings under section 11(Ga) of the Nari-O-Shishu Nirjatan Daman Ain, 2000 before the High Court Division of the Supreme Court of Bangladesh. The Court was pleased to Issue Rule and stayed the further proceedings of the case.</p></li></ol>" },
  },
  {
    id: "human-trafficking",
    category: "criminal",
    position: 20,
    title: { en: "Human Trafficking", bn: "মানব পাচার" },
    excerpt: { en: "The Law Emporium is adept in dealing with this special category of cases involving offences of human trafficking.", bn: "মানব পাচার সংক্রান্ত মামলা পরিচালনায় দ্য ল’ এম্পোরিয়ামের পারদর্শীতা স্বীকৃত।" },
    body: { en: "<p>The Law Emporium is adept in dealing with this special category of cases involving offences of human trafficking.</p>", bn: "<p>মানব পাচার সংক্রান্ত মামলা পরিচালনায় দ্য ল’ এম্পোরিয়ামের পারদর্শীতা স্বীকৃত।</p>" },
  },
  {
    id: "writ-rights",
    category: "constitutional",
    position: 1,
    title: { en: "Writs and fundamental rights", bn: "রিট ও মৌলিক অধিকার" },
    excerpt: {
      en: "Petitions against arbitrary arrest, service decisions, and ultra vires action by public bodies.",
      bn: "ইচ্ছামূলক গ্রেপ্তার, চাকুরি সিদ্ধান্ত এবং সরকারি সংস্থার এখতিয়ারবহির্ভূত কাজের বিরুদ্ধে রিট।",
    },
    body: {
      en: "<p>We draft and move writ petitions where a public authority has acted without law or in breach of natural justice. Typical records include university decisions, passport and travel restrictions, and disciplinary action in the services.</p>",
      bn: "<p>আইন ছাড়া বা ন্যায়বিচারের নীতি লঙ্ঘন করে জনকর্তৃপক্ষ কাজ করলে রিট। বিশ্ববিদ্যালয়, পাসপোর্ট ও চাকুরির শৃঙ্খলা বিষয় ঘন ঘন আসে।</p>",
    },
  },
  {
    id: "service-matter",
    category: "constitutional",
    position: 2,
    title: { en: "Service and administrative matters", bn: "চাকুরি ও প্রশাসনিক বিষয়" },
    excerpt: {
      en: "Absorption, legitimate expectation, and review of departmental inquiries.",
      bn: "আত্তীকরণ, বৈধ প্রত্যাশা এবং বিভাগীয় তদন্তের পর্যালোচনা।",
    },
    body: {
      en: "<p>Disputes out of public employment often turn on circulars, not statutes. We trace the instrument, the date it took effect, and whether the petitioner was heard.</p>",
      bn: "<p>সরকারি চাকুরির বিরোধ প্রায়ই পরিপত্রে ঘোরে। আমরা দলিল, কার্যকর তারিখ এবং শুনানির সুযোগ খুঁজি।</p>",
    },
  },
  {
    id: "bar-exam",
    category: "constitutional",
    position: 3,
    title: { en: "Professional regulators and the Bar", bn: "পেশা নিয়ন্ত্রক ও বার" },
    excerpt: {
      en: "Challenges to enrolment decisions and other regulatory acts that affect a lawyer’s livelihood.",
      bn: "তালিকাভুক্তি সিদ্ধান্ত এবং আইনজীবীর জীবিকায় প্রভাব ফেলা নিয়ন্ত্রক কাজের চ্যালেঞ্জ।",
    },
    body: {
      en: "<p>Where a regulator excludes a candidate without a fair process, the High Court Division can be asked to intervene. The record is usually thin; the argument is about procedure and equal treatment.</p>",
      bn: "<p>নিয়ন্ত্রক ন্যায্য প্রক্রিয়া ছাড়া প্রার্থী বাদ দিলে হাইকোর্ট হস্তক্ষেপ করতে পারে।</p>",
    },
  },
  {
    id: "civil-appeal",
    category: "civil",
    position: 1,
    title: { en: "Civil appeal and miscellaneous appeal", bn: "দেওয়ানি আপিল ও বিবিধ আপিল" },
    excerpt: {
      en: "First appeals and miscellaneous appeals from the district judiciary to the High Court Division.",
      bn: "জেলা বিচার বিভাগ থেকে হাইকোর্ট বিভাগে প্রথম আপিল ও বিবিধ আপিল।",
    },
    body: {
      en: "<p>An aggrieved party may file an appeal or miscellaneous appeal against a judgment and decree, or against an appealable order, of the district, additional district, or (in some cases) joint district judge. We settle grounds, move for stay, and argue the appeal on the paper book.</p>",
      bn: "<p>জেলা, অতিরিক্ত জেলা বা কোনো ক্ষেত্রে যুগ্ম জেলা জজের রায় ও ডিক্রির বিরুদ্ধে আপিল। আমরা গ্রাউন্ড তৈরি, স্থগিতাদেশ এবং পেপার বুকে শুনানি করি।</p>",
    },
    cases: {
      en: "<p>Illustrative: stay of a money decree pending first appeal; miscellaneous appeal against an ad-interim injunction.</p>",
      bn: "<p>উদাহরণ: অর্থ ডিক্রি স্থগিত; অন্তর্বর্তী নিষেধাজ্ঞার বিরুদ্ধে বিবিধ আপিল।</p>",
    },
  },
  {
    id: "civil-revision",
    category: "civil",
    position: 2,
    title: { en: "Civil revision", bn: "দেওয়ানি রিভিশন" },
    excerpt: {
      en: "Revisional jurisdiction where no appeal lies, including third-party applications in a proper case.",
      bn: "আপিল না থাকলে রিভিশন; যথাযথ ক্ষেত্রে তৃতীয় পক্ষের আবেদন।",
    },
    body: {
      en: "<p>Revision is not a second appeal. We confine the petition to jurisdictional error, material irregularity, and the face of the record.</p>",
      bn: "<p>রিভিশন দ্বিতীয় আপিল নয়। এখতিয়ারগত ভুল ও রেকর্ডের মুখের অনিয়মে সীমাবদ্ধ রাখি।</p>",
    },
  },
  {
    id: "land-title",
    category: "civil",
    position: 3,
    title: { en: "Title and possession of land", bn: "জমির স্বত্ব ও দখল" },
    excerpt: {
      en: "Title suits, recovery of possession, mutation disputes, and land survey tribunal work.",
      bn: "স্বত্ব মোকদ্দমা, দখল উদ্ধার, নামজারি এবং ভূমি জরিপ ট্রাইব্যুনাল।",
    },
    body: {
      en: "<p>Land files are document-heavy. We sequence the khatian, the deed chain, and possession evidence before the first hearing, then keep the trial to the issues that actually decide title.</p>",
      bn: "<p>খতিয়ান, দলিল শৃঙ্খল ও দখল প্রমাণ সাজিয়ে স্বত্বের ইস্যুতে বিচার সীমাবদ্ধ রাখি।</p>",
    },
  },
  {
    id: "adr",
    category: "civil",
    position: 4,
    title: { en: "Alternative dispute resolution", bn: "বিকল্প বিরোধ নিষ্পত্তি" },
    excerpt: {
      en: "Negotiation, mediation, and consent terms where a decree would cost more than the dispute.",
      bn: "আলোচনা, মধ্যস্থতা এবং সম্মতি — যেখানে ডিক্রির খরচ বিরোধের চেয়ে বেশি।",
    },
    body: {
      en: "<p>Not every civil file should be tried. We advise when to hold a brief and when to write a settlement that the court can record.</p>",
      bn: "<p>প্রতিটি দেওয়ানি নথি বিচার্য নয়। কখন মীমাংসা লিখতে হয় তা পরামর্শ দিই।</p>",
    },
  },
  {
    id: "marriage",
    category: "family",
    position: 1,
    title: { en: "Marriage and restitution", bn: "বিবাহ ও দাম্পত্য অধিকার" },
    excerpt: {
      en: "Registration questions, restitution of conjugal rights, and related family-court applications.",
      bn: "নিবন্ধন, দাম্পত্য অধিকার পুনরুদ্ধার এবং পারিবারিক আদালতের আবেদন।",
    },
    body: {
      en: "<p>Family court work is factual and time-sensitive. We keep petitions short, attach the documents that matter, and avoid turning a household dispute into a collateral criminal case unless the record requires it.</p>",
      bn: "<p>পারিবারিক মামলা তথ্যনির্ভর। আবেদন সংক্ষিপ্ত রাখি এবং প্রয়োজন ছাড়া ফৌজদারি শাখা খুলি না।</p>",
    },
  },
  {
    id: "divorce",
    category: "family",
    position: 2,
    title: { en: "Divorce and dower", bn: "তালাক ও দেনমোহর" },
    excerpt: {
      en: "Dissolution, dower claims, and maintenance, including enforcement of family-court orders.",
      bn: "বিবাহবিচ্ছেদ, দেনমোহর ও ভরণপোষণ এবং আদেশের বাস্তবায়ন।",
    },
    body: {
      en: "<p>We appear for either spouse. The first task is to map the personal law that actually applies, then the forum, then the money claims that can be proved.</p>",
      bn: "<p>প্রযোজ্য ব্যক্তিগত আইন, ফোরাম এবং প্রমাণযোগ্য অর্থ দাবি সাজাই।</p>",
    },
  },
  {
    id: "custody",
    category: "family",
    position: 3,
    title: { en: "Custody and guardianship", bn: "হেফাজত ও অভিভাবকত্ব" },
    excerpt: {
      en: "Interim and final custody, visitation, and guardianship of person and property.",
      bn: "অন্তর্বর্তী ও চূড়ান্ত হেফাজত, সাক্ষাৎ এবং ব্যক্তি ও সম্পত্তির অভিভাবকত্ব।",
    },
    body: {
      en: "<p>The child’s welfare is the stated test. We put schooling, housing, and the existing care arrangement on affidavit rather than arguing temperament.</p>",
      bn: "<p>শিশুর কল্যাণই মাপকাঠি। স্কুল, বাসস্থান ও বিদ্যমান যত্ন হলফনামায় তুলি।</p>",
    },
  },
  {
    id: "incorporation",
    category: "company",
    position: 1,
    title: { en: "Company incorporation", bn: "কোম্পানি গঠন" },
    excerpt: {
      en: "Name clearance, incorporation filings, and first-board housekeeping.",
      bn: "নাম ছাড়করণ, গঠন দাখিল এবং প্রথম বোর্ডের কাজ।",
    },
    body: {
      en: "<p>We take a client from name clearance through incorporation and the first statutory registers. The aim is a file the registrar will accept on the first pass.</p>",
      bn: "<p>নাম ছাড়করণ থেকে গঠন ও প্রথম রেজিস্টার — রেজিস্ট্রার যেন প্রথমবারেই গ্রহণ করেন।</p>",
    },
  },
  {
    id: "moa-aoa",
    category: "company",
    position: 2,
    title: { en: "Memorandum and articles", bn: "মেমোরেন্ডাম ও আর্টিকেলস" },
    excerpt: {
      en: "Drafting and amending constitutional documents of the company.",
      bn: "কোম্পানির সংবিধিবদ্ধ দলিল খসড়া ও সংশোধন।",
    },
    body: {
      en: "<p>The memorandum sets objects and capital. The articles set how the company is run. We draft both to match the actual shareholders’ bargain, not a generic template that will fight the deal later.</p>",
      bn: "<p>মেমোরেন্ডাম উদ্দেশ্য ও মূলধন; আর্টিকেলস পরিচালনা। পরবর্তী দ্বন্দ্ব এড়াতে প্রকৃত চুক্তি অনুযায়ী খসড়া।</p>",
    },
  },
  {
    id: "mergers",
    category: "company",
    position: 3,
    title: { en: "Mergers and acquisitions", bn: "একত্রীকরণ ও অধিগ্রহণ" },
    excerpt: {
      en: "Share purchases, asset deals, and the court or regulator steps a deal actually needs.",
      bn: "শেয়ার ক্রয়, সম্পদ চুক্তি এবং প্রয়োজনীয় আদালত বা নিয়ন্ত্রক ধাপ।",
    },
    body: {
      en: "<p>We diligence title, licences, and pending litigation, then paper the acquisition in the form the Companies Act and the sector regulator will recognise.</p>",
      bn: "<p>স্বত্ব, লাইসেন্স ও চলমান মামলা যাচাই করে আইন ও নিয়ন্ত্রক যে ফর্ম চায় সেভাবে দলিল।</p>",
    },
  },
  {
    id: "winding-up",
    category: "company",
    position: 4,
    title: { en: "Winding up and liquidation", bn: "বিলোপ ও লিক্যুইডেশন" },
    excerpt: {
      en: "Voluntary and court-supervised winding up, including creditor correspondence.",
      bn: "স্বেচ্ছায় ও আদালত তত্ত্বাবধানে বিলোপ; পাওনাদার পত্রালাপ।",
    },
    body: {
      en: "<p>Closing a company is a statutory sequence. We keep the resolutions, notices, and liquidator papers in the order the court file expects.</p>",
      bn: "<p>কোম্পানি বন্ধ একটি আইনগত ক্রম। প্রস্তাব, নোটিশ ও লিক্যুইডেটর কাগজ সেই ক্রমে রাখি।</p>",
    },
  },
  {
    id: "pro-bono",
    category: "pro-bono",
    position: 1,
    title: { en: "Pro bono dockets", bn: "প্রো বোনো ডকেট" },
    excerpt: {
      en: "Selected criminal, custody, and rights matters for clients who cannot fund a brief.",
      bn: "যারা ফি দিতে পারেন না, তাদের নির্বাচিত ফৌজদারি, হেফাজত ও অধিকার মামলা।",
    },
    body: {
      en: "<p>Chambers takes a limited number of pro bono files each year. The test is merit plus need, not publicity. We do not advertise outcomes; we list the kinds of work we will consider.</p>",
      bn: "<p>প্রতি বছর সীমিত প্রো বোনো নথি। যোগ্যতা ও প্রয়োজন, প্রচার নয়।</p>",
    },
  },
];

export function servicesByCategory(category: ServiceCategory): Service[] {
  return services
    .filter((item) => item.category === category)
    .sort((a, b) => a.position - b.position);
}

export function getService(id: string): Service | undefined {
  return services.find((item) => item.id === id);
}

export function categoryFromPath(slug: string): ServiceCategory | undefined {
  const entry = Object.entries(categoryRoutes).find(([, value]) =>
    value.path.endsWith(`/${slug}`),
  );
  return entry?.[0] as ServiceCategory | undefined;
}

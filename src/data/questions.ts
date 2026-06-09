import type { ExamModule, Question } from "../domain/types";

const optionIds = ["A", "B", "C", "D"];

function choice(
  id: string,
  module: ExamModule,
  prompt: string,
  choices: string[],
  answer: string,
  explanation: string,
  source: string,
  extra: Partial<Question> = {},
): Question {
  return {
    id,
    module,
    type: "choice",
    prompt,
    options: choices.map((text, index) => ({ id: optionIds[index], text })),
    answer,
    explanation,
    source,
    isVariant: false,
    points: module === "translation" || module === "reading" ? 2 : 1,
    ...extra,
  };
}

function blank(
  id: string,
  prompt: string,
  answer: string,
  explanation: string,
  acceptedAnswers: string[] = [],
): Question {
  return {
    id,
    module: "writing",
    type: "blank",
    prompt,
    answer,
    acceptedAnswers,
    explanation,
    source: "《新通用大学英语综合教程 2》Unit 8 My Favourite App",
    isVariant: false,
    points: 2,
  };
}

const listeningSource = "《新潮大学英语四级考试教程》（第三版）真题训练一 Section A";
const audioOne = { file: "/audio/college-test-one.mp3", label: "College Test One Audio" };

export const questions: Question[] = [
  choice("lis-01", "listening", "What do we learn about the JetBlue Airlines flight?", [
    "It hit a bird shortly after takeoff.",
    "Its crew members went on strike.",
    "It narrowly escaped a crash when turning around.",
    "Its captain was injured during landing.",
  ], "A", "The report says the plane struck a bird minutes after takeoff and turned around.", listeningSource, { audio: audioOne }),
  choice("lis-02", "listening", "How did the passengers feel when the plane came to a stop?", [
    "Panicked.", "Nervous.", "Relieved.", "Contented.",
  ], "C", "Brian Healy says there was relief when the plane came to a stop.", listeningSource, { audio: audioOne }),
  choice("lis-03", "listening", "What happened to the deadly snake?", [
    "It is kept in a secure area.", "It escaped the zoo again.", "It was caught a second time.", "It disappeared six days ago.",
  ], "B", "The snake slipped away for the second time after being found.", listeningSource, { audio: audioOne }),
  choice("lis-04", "listening", "How have the zoo staff been feeling about the snake?", [
    "Squeezed.", "Threatened.", "Disappointed.", "Frustrated.",
  ], "D", "The report explicitly says the snake has been frustrating the staff.", listeningSource, { audio: audioOne }),
  choice("lis-05", "listening", "What concern followed the introduction of electric bikes?", [
    "It was condemned as crazy.", "It enriched night life.", "Residents rejected it.", "It raised safety concerns.",
  ], "D", "Riders ignoring road rules, especially at night, raised safety concerns.", listeningSource, { audio: audioOne }),
  choice("lis-06", "listening", "What are electric-bike riders supposed to do?", [
    "Avoid one-way streets.", "Ensure pedestrian safety alone.", "Follow the same traffic rules as drivers.", "Always give way to cars.",
  ], "C", "The report states riders must follow all the same rules as automobile drivers.", listeningSource, { audio: audioOne }),
  choice("lis-07", "listening", "Why did Anna Cumber support electric bikes?", [
    "To ease traffic.", "To bring new life downtown.", "To add transport choices.", "To reduce air pollution.",
  ], "B", "She introduced them as a way to bring new life into downtown Jacksonville.", listeningSource, { audio: audioOne }),

  choice("tr-01", "translation", "“造纸术”的英文是：", ["paper cutting", "paper-making", "printing art", "wood carving"], "B", "造纸术固定译为 paper-making。", "中国传统文化词汇复习范围"),
  choice("tr-02", "translation", "“儒家思想”的英文是：", ["Confucianism", "Taoism", "Buddhism", "Classicism"], "A", "儒家思想译为 Confucianism。", "中国传统文化词汇复习范围"),
  choice("tr-03", "translation", "“二十四节气”的英文是：", ["twenty-four seasons", "twenty-four solar terms", "Chinese lunar days", "seasonal festivals"], "B", "标准表达为 twenty-four solar terms。", "中国传统文化词汇复习范围"),
  choice("tr-04", "translation", "“针灸”的英文是：", ["massage", "acupuncture", "therapy", "medicine"], "B", "针灸译为 acupuncture。", "中国传统文化词汇复习范围"),
  choice("tr-05", "translation", "“丝绸之路”的英文是：", ["the Silk Road", "the Silk Route City", "the Grand Canal", "the Trade Road"], "A", "标准名称为 the Silk Road。", "中国传统文化词汇复习范围"),
  choice("tr-06", "translation", "“人工智能”的英文是：", ["artificial intelligence", "automatic information", "digital intelligence", "virtual technology"], "A", "人工智能的标准表达是 artificial intelligence。", "中国传统文化词汇复习范围"),
  choice("tr-07", "translation", "“经济全球化”的英文是：", ["global economy", "economic globalization", "world trade", "economic corridor"], "B", "经济全球化译为 economic globalization。", "中国传统文化词汇复习范围"),
  choice("tr-08", "translation", "“交通拥堵”的英文是：", ["traffic rule", "traffic jam", "road block", "rush hour"], "B", "交通拥堵常译为 traffic jam。", "中国传统文化词汇复习范围"),
  choice("tr-v1", "translation", "选择“尊敬老人”的正确译法：", ["respect the elderly", "visit old people", "support adults", "honor history"], "A", "the elderly 表示老年人；respect the elderly 为资料中的标准表达。", "传统文化词汇变式", { isVariant: true }),

  choice("voc-01", "vocabulary", "The flight was forced to turn around _____ the bird strike.", ["because of", "instead of", "apart from", "regardless of"], "A", "because of 后接名词短语，表示“因为”。", "听力原文高频表达变式", { isVariant: true }),
  choice("voc-02", "vocabulary", "Children can learn money skills through _____ examples.", ["practical", "anxious", "poisonous", "political"], "A", "原对话强调 practical examples，而不是 abstract sums。", "真题二长对话词汇变式", { isVariant: true }),
  choice("voc-03", "vocabulary", "The city introduced the bikes as a one-year _____ program.", ["pilot", "pension", "penalty", "platform"], "A", "pilot program 表示试点项目。", "真题一新闻词汇"),
  choice("voc-04", "vocabulary", "Drivers should not _____ through traffic.", ["weave", "ponder", "foster", "capture"], "A", "weave through traffic 表示在车流中穿插。", "Unit 4 Dos and Don’ts for Drivers"),
  choice("voc-05", "vocabulary", "The app has seamlessly _____ into my daily life.", ["integrated", "escaped", "contributed", "guarded"], "A", "integrate into 表示融入。", "Unit 8 My Favourite App"),
  choice("voc-06", "vocabulary", "Good drivers pay full attention and do not _____ traffic rules.", ["break", "offer", "link", "deposit"], "A", "break rules 表示违反规则。", "Unit 4 Dos and Don’ts for Drivers"),
  choice("voc-v1", "vocabulary", "A close-knit community is one whose members are _____.", ["supportive", "distant", "silent", "temporary"], "A", "close-knit 强调成员关系紧密、相互支持。", "Unit 8 词汇变式", { isVariant: true }),

  choice("read-01", "reading", "Why does Yu Hui use a Mon Mon device?", [
    "To shop online.", "To send emails.", "To make phone calls.", "To connect with her parents through WeChat.",
  ], "D", "The device links through the cloud to WeChat and is used to communicate with her parents.", "《同步练习 2》WeChat 阅读"),
  choice("read-02", "reading", "Which statement about WeChat and Slack is NOT correct?", [
    "They provide exactly the same service.", "WeChat has a business-oriented service.", "WeChat is used at work.", "The services are similar.",
  ], "A", "The text says akin to, meaning similar to, not exactly the same.", "《同步练习 2》WeChat 阅读"),
  choice("read-03", "reading", "Paying at physical stores with WeChat becomes _____.", [
    "more costly", "more efficient", "less reliable", "more professional",
  ], "B", "Payment takes only a few taps, making it efficient and convenient.", "《同步练习 2》WeChat 阅读"),
  choice("read-04", "reading", "The passage discusses WeChat's influence on all EXCEPT _____.", [
    "communication", "work", "entertainment", "innovation",
  ], "D", "Innovation is mentioned as a quality of WeChat, but the passage does not discuss its influence on innovation.", "《同步练习 2》WeChat 阅读"),
  choice("read-v1", "reading", "“Leaving WeChat behind is akin to stepping back in time” implies that life without it is _____.", [
    "fashionable", "outdated", "expensive", "private",
  ], "B", "Stepping back in time suggests being behind the present age, or outdated.", "阅读理解变式", { isVariant: true }),

  blank("write-01", "I can’t live without Little Red Book, as it has seamlessly _____ into my daily life.", "integrated", "固定搭配 integrate into，句中需要过去分词 integrated。"),
  blank("write-02", "It offers a vibrant _____ for self-expression and interaction.", "platform", "platform 表示提供表达和互动的平台。"),
  blank("write-03", "It is great for sharing photos that _____ special moments.", "capture", "capture special moments 表示捕捉珍贵时刻。"),
  blank("write-04", "I truly feel part of _____ where everyone supports each other.", "a close-knit community", "close-knit community 表示关系紧密的社区。", ["a close knit community"]),
  blank("write-05", "It encourages me to explore new _____ and improve myself.", "interests", "explore new interests 表示探索新的兴趣。"),
  { ...blank("write-v1", "The app helps me gain new _____ from other people’s stories.", "perspectives", "gain new perspectives 表示获得新的视角。"), isVariant: true, source: "Unit 8 写作表达变式" },
];

export const questionsById = new Map(questions.map((question) => [question.id, question]));


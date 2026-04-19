import type { TestConfig } from '../protocol/types';

export const kinggloryTest: TestConfig = {
  id: 'kingglory',
  name: '王者荣耀人格蒸馏测试',
  description: '峡谷玩家人格蒸馏，测测你在王者世界的真实定位',
  dimensions: [
    { id: 'teamwork', name: '团队协作', description: '与队友配合和补位的意愿', min_label: '各玩各的', max_label: '团队粘合剂' },
    { id: 'resilience', name: '逆风韧性', description: '逆风局时还能不能稳住', min_label: '点了吧', max_label: '水晶没炸不算输' },
    { id: 'elo_attitude', name: 'ELO态度', description: '你有多相信系统在搞你', min_label: '理性看待', max_label: '赛博受害者' },
    { id: 'hero_flexibility', name: '英雄态度', description: '英雄池和版本适应方式', min_label: '一招鲜', max_label: '版本答案奴隶' },
    { id: 'chat_behavior', name: '聊天攻击性', description: '你在局内的嘴臭浓度', min_label: '素质玩家', max_label: '祖安皇帝' },
    { id: 'competitive_motivation', name: '上分执念', description: '你打排位有多像在上班', min_label: '娱乐一下', max_label: '分奴本奴' },
    { id: 'mechanism_exploit', name: '机制利用', description: '你有多擅长玩匹配机制', min_label: '老实人', max_label: '算法蛀虫' },
    { id: 'blame_tendency', name: '甩锅倾向', description: '一出事你先怪谁', min_label: '先看自己', max_label: '队友祭天' },
    { id: 'skill_pursuit', name: '操作追求', description: '你有多迷恋秀操作和硬实力', min_label: '随便玩玩', max_label: '操作怪' }
  ],
  questions: [
    {
      id: 'q1',
      text: '排位匹配 30 秒秒进，你第一反应是：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '“希望这把别给我四个畜生，我想赢。”',
          scores: { competitive_motivation: 3, resilience: 2, teamwork: 2, skill_pursuit: 2 },
          evidence: { supports: [{ type: 'rank_slave', weight: 0.5 }, { type: 'smurf_addict', weight: 0.5 }] }
        },
        {
          id: 'b',
          text: '“秒进？懂了，系统又给我安排牢饭了。”',
          scores: { elo_attitude: 3, blame_tendency: 2, resilience: 1 },
          evidence: { supports: [{ type: 'prisoner', weight: 2 }], conflicts: [{ type: 'rotten_immortal', weight: 1 }] }
        },
        {
          id: 'c',
          text: '“无所谓，开了就当电子榨菜。”',
          scores: { competitive_motivation: 1, resilience: 1, teamwork: 1, skill_pursuit: 1 },
          evidence: { supports: [{ type: 'rotten_immortal', weight: 1.5 }, { type: 'ai_bot', weight: 1 }] }
        }
      ]
    },
    {
      id: 'q2',
      text: '队友开局 0-3 还发“我的我的”，你会：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '“没事，先稳住，别再送成峡谷慈善家了。”',
          scores: { teamwork: 3, resilience: 3, blame_tendency: 1 },
          evidence: { supports: [{ type: 'rank_slave', weight: 0.3 }, { type: 'rotten_immortal', weight: 1 }] }
        },
        {
          id: 'b',
          text: '“这都能死？点了吧，带不动出生队友。”',
          scores: { resilience: 1, chat_behavior: 2, teamwork: 1, blame_tendency: 2 },
          evidence: { supports: [{ type: 'surrender', weight: 2.5 }, { type: 'skin_warrior', weight: 1 }], conflicts: [{ type: 'rank_slave', weight: 1 }] }
        },
        {
          id: 'c',
          text: '什么都不说，心里已经默认这把有一只入机混进来了。',
          scores: { teamwork: 1, blame_tendency: 2, resilience: 2 },
          evidence: { supports: [{ type: 'ai_bot', weight: 1 }, { type: 'one_trick', weight: 1.5 }] }
        }
      ]
    },
    {
      id: 'q3',
      text: '连跪五把后朋友叫你双排，你会：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '“来，哥带你飞，今天必须找回场子。”',
          scores: { competitive_motivation: 3, resilience: 3, skill_pursuit: 3 },
          evidence: { supports: [{ type: 'smurf_addict', weight: 1.0 }, { type: 'rank_slave', weight: 0.6 }] }
        },
        {
          id: 'b',
          text: '“双什么排，ELO 今天明显在做我。”',
          scores: { elo_attitude: 3, blame_tendency: 3, resilience: 1 },
          evidence: { supports: [{ type: 'prisoner', weight: 2 }], conflicts: [{ type: 'rotten_immortal', weight: 1 }] }
        },
        {
          id: 'c',
          text: '“排位先别碰了，去娱乐模式当个人吧。”',
          scores: { elo_attitude: 1, resilience: 2, competitive_motivation: 1, teamwork: 2 },
          evidence: { supports: [{ type: 'rotten_immortal', weight: 2 }, { type: 'surrender', weight: 0.5 }] }
        }
      ]
    },
    {
      id: 'q4',
      text: '群里分享“鸡爪流上分攻略”，你：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '“学到了，这就去钻系统裤裆。”',
          scores: { mechanism_exploit: 3, competitive_motivation: 3, resilience: 1 },
          evidence: { supports: [{ type: 'unearned', weight: 2 }, { type: 'prisoner', weight: 0.5 }] }
        },
        {
          id: 'b',
          text: '“这不就是高级摆烂？老子宁愿输也不吃这口屎。”',
          scores: { mechanism_exploit: 1, skill_pursuit: 2, resilience: 2, competitive_motivation: 2 },
          evidence: { supports: [{ type: 'rank_slave', weight: 0.4 }, { type: 'one_trick', weight: 2.0 }], conflicts: [{ type: 'unearned', weight: 2 }] }
        },
        {
          id: 'c',
          text: '“你们才知道？我早靠这玩意薅系统羊毛了。”',
          scores: { mechanism_exploit: 3, elo_attitude: 3, competitive_motivation: 2 },
          evidence: { supports: [{ type: 'unearned', weight: 2 }, { type: 'prisoner', weight: 1 }] }
        }
      ]
    },
    {
      id: 'q5',
      text: '选人阶段，你更像：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '先看阵容补位，哪怕补成老黄牛也得把这把拼出来。',
          scores: { teamwork: 3, hero_flexibility: 3, skill_pursuit: 2 },
          evidence: { supports: [{ type: 'rank_slave', weight: 0.7 }, { type: 'skin_warrior', weight: 0.5 }] }
        },
        {
          id: 'b',
          text: '秒锁自己那一个绝活，阵容烂不烂关我屁事。',
          scores: { hero_flexibility: 1, skill_pursuit: 3, teamwork: 1 },
          evidence: { supports: [{ type: 'one_trick', weight: 3.0 }, { type: 'smurf_addict', weight: 0.5 }], conflicts: [{ type: 'rank_slave', weight: 1 }] }
        },
        {
          id: 'c',
          text: '直接拿版本 T0，强度面前一切信仰都是笑话。',
          scores: { hero_flexibility: 3, competitive_motivation: 3 },
          evidence: { supports: [{ type: 'rank_slave', weight: 0.8 }, { type: 'unearned', weight: 0.5 }] }
        }
      ]
    },
    {
      id: 'q6',
      text: '逆风局经济差 8000，队友已经开始狗叫，你会：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '“别吵了，先守高地，没炸水晶就别提前哭丧。”',
          scores: { resilience: 3, teamwork: 3, blame_tendency: 1 },
          evidence: { supports: [{ type: 'rank_slave', weight: 0.4 }, { type: 'rotten_immortal', weight: 1 }] }
        },
        {
          id: 'b',
          text: '“点了点了，再打下去我怕血压先炸。”',
          scores: { resilience: 1, chat_behavior: 1, teamwork: 1 },
          evidence: { supports: [{ type: 'surrender', weight: 2.5 }], conflicts: [{ type: 'rank_slave', weight: 1 }] }
        },
        {
          id: 'c',
          text: '“打野 0-5 还活着呢？”直接开喷，把局内语音当脱口秀现场。',
          scores: { chat_behavior: 3, blame_tendency: 3, teamwork: 1 },
          evidence: { supports: [{ type: 'skin_warrior', weight: 2 }, { type: 'prisoner', weight: 1 }], conflicts: [{ type: 'rotten_immortal', weight: 1 }] }
        }
      ]
    },
    {
      id: 'q7',
      text: '你打野抓崩了被队友发“？”，你会：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '“我的，下一波补回来，先别像野狗一样乱叫。”',
          scores: { blame_tendency: 1, teamwork: 3, chat_behavior: 1 },
          evidence: { supports: [{ type: 'rank_slave', weight: 0.2 }, { type: 'rotten_immortal', weight: 0.5 }] }
        },
        {
          id: 'b',
          text: '“你上路不压线你装你妈呢？”立刻把锅精准空投给别人。',
          scores: { blame_tendency: 3, chat_behavior: 3, teamwork: 1 },
          evidence: { supports: [{ type: 'skin_warrior', weight: 2 }, { type: 'prisoner', weight: 1 }] }
        },
        {
          id: 'c',
          text: '一句不回，继续刷野，主打一个谁也别想从我嘴里抠字。',
          scores: { blame_tendency: 2, teamwork: 1, resilience: 2 },
          evidence: { supports: [{ type: 'ai_bot', weight: 1 }, { type: 'one_trick', weight: 2.0 }, { type: 'smurf_addict', weight: 0.4 }] }
        }
      ]
    },
    {
      id: 'q8',
      text: '你排位最常用的上分方式是：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '单排硬打，赢了算实力，输了算队友欠收拾。',
          scores: { skill_pursuit: 3, competitive_motivation: 3, resilience: 2 },
          evidence: { supports: [{ type: 'smurf_addict', weight: 0.8 }, { type: 'one_trick', weight: 2.5 }, { type: 'rank_slave', weight: 0.2 }] }
        },
        {
          id: 'b',
          text: '找大腿双排，能蹭星星就别装什么独狼英雄。',
          scores: { teamwork: 3, competitive_motivation: 2 },
          evidence: { supports: [{ type: 'skin_warrior', weight: 1 }, { type: 'rank_slave', weight: 0.2 }] }
        },
        {
          id: 'c',
          text: '控评分、玩机制、钻系统空子，躺着也要把星星混到手。',
          scores: { mechanism_exploit: 3, competitive_motivation: 3, teamwork: 1, resilience: 1 },
          evidence: { supports: [{ type: 'unearned', weight: 2 }], conflicts: [{ type: 'one_trick', weight: 1 }] }
        }
      ]
    },
    {
      id: 'q9',
      text: '你在游戏里最像哪句口头禅：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '“稳住，能打，别急着当孤儿。”',
          scores: { teamwork: 3, resilience: 2, blame_tendency: 1 },
          evidence: { supports: [{ type: 'rank_slave', weight: 0.2 }, { type: 'rotten_immortal', weight: 1 }] }
        },
        {
          id: 'b',
          text: '“？？？这都能送？你手机插电饭锅上玩的？”',
          scores: { chat_behavior: 3, blame_tendency: 3, teamwork: 1 },
          evidence: { supports: [{ type: 'skin_warrior', weight: 2 }, { type: 'prisoner', weight: 1 }], conflicts: [{ type: 'ai_bot', weight: 1 }] }
        },
        {
          id: 'c',
          text: '“点了，无所谓，反正你们也不配赢。”',
          scores: { resilience: 1, competitive_motivation: 1, chat_behavior: 1, teamwork: 1 },
          evidence: { supports: [{ type: 'surrender', weight: 2.5 }, { type: 'rotten_immortal', weight: 1 }] }
        }
      ]
    },
    {
      id: 'q10',
      text: '你觉得“能者多劳”在峡谷里的真实含义是：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '能者多牢，越会玩越被系统按着吃屎。',
          scores: { elo_attitude: 3, blame_tendency: 2, resilience: 1 },
          evidence: { supports: [{ type: 'prisoner', weight: 2 }], conflicts: [{ type: 'rotten_immortal', weight: 1 }] }
        },
        {
          id: 'b',
          text: '有实力就该多 C，带四个废物也是实力的一部分。',
          scores: { skill_pursuit: 3, competitive_motivation: 3, teamwork: 1 },
          evidence: { supports: [{ type: 'smurf_addict', weight: 0.8 }, { type: 'rank_slave', weight: 0.2 }, { type: 'one_trick', weight: 2.0 }] }
        },
        {
          id: 'c',
          text: '会钻机制的人才是真的聪明，老实人只配继续坐牢。',
          scores: { mechanism_exploit: 3, competitive_motivation: 3, teamwork: 1, skill_pursuit: 1 },
          evidence: { supports: [{ type: 'unearned', weight: 2 }], conflicts: [{ type: 'one_trick', weight: 1 }] }
        }
      ]
    }
  ],
  personalityTypes: [
    {
      id: 'prisoner',
      name: '牢玩家',
      description: '你是峡谷里最标准的赛博服刑人员。你嘴上天天骂 ELO 把你安排进猪圈，手上却还在疯狂点开始匹配。你不是不想跑，只是觉得下一把说不定就刑满释放。',
      meme: '能者多牢，牢到失眠',
      template: { teamwork: 1.3, resilience: 1.2, elo_attitude: 3.0, hero_flexibility: 1.7, chat_behavior: 2.0, competitive_motivation: 2.2, mechanism_exploit: 1.4, blame_tendency: 3.0, skill_pursuit: 1.9 },
      constraints: [
        { dimension: 'elo_attitude', min: 2.7, hard: true },
        { dimension: 'blame_tendency', min: 2.4, hard: true }
      ]
    },
    {
      id: 'unearned',
      name: '不牢而获',
      description: '你对系统机制的理解已经到了不要脸的程度。别人研究连招，你研究怎么把自己伪装成低风险废物，然后美美躺赢。上分对你来说不是竞技，是钻漏洞。',
      meme: '我送故我赢',
      template: { teamwork: 1.1, resilience: 1.2, elo_attitude: 2.1, hero_flexibility: 2.0, chat_behavior: 1.2, competitive_motivation: 2.9, mechanism_exploit: 3.0, blame_tendency: 1.5, skill_pursuit: 1.2 },
      constraints: [
        { dimension: 'mechanism_exploit', min: 2.8, hard: true },
        { dimension: 'competitive_motivation', min: 2.4, weight: 1.1 },
        { dimension: 'teamwork', max: 1.5, hard: true }
      ]
    },
    {
      id: 'ai_bot',
      name: '入机',
      description: '你的操作经常让人怀疑这号到底是不是活人。走位像抽签，技能像许愿，团战像旅游。你不是不会玩，你只是总能精准踩中每一个人类不该踩的坑。',
      meme: '人机看了都想举报',
      template: { teamwork: 1.4, resilience: 1.8, elo_attitude: 1.3, hero_flexibility: 1.6, chat_behavior: 1.0, competitive_motivation: 1.2, mechanism_exploit: 1.0, blame_tendency: 1.6, skill_pursuit: 1.0 },
      constraints: [
        { dimension: 'competitive_motivation', max: 1.6, hard: true },
        { dimension: 'skill_pursuit', max: 1.4, hard: true }
      ]
    },
    {
      id: 'surrender',
      name: '右上角福袋',
      description: '你的手指和投降按钮之间大概只差一个经济差提示。你不是不想赢，你只是比谁都更早接受“这把寄了”的现实。队友还在做梦，你已经开始规划下一把。',
      meme: '点了吧，活着挺累的',
      template: { teamwork: 1.0, resilience: 1.0, elo_attitude: 1.6, hero_flexibility: 1.5, chat_behavior: 2.4, competitive_motivation: 1.1, mechanism_exploit: 1.0, blame_tendency: 1.7, skill_pursuit: 1.0 },
      constraints: [
        { dimension: 'resilience', max: 1.3, hard: true },
        { dimension: 'chat_behavior', min: 1.8, weight: 1.1 },
        { dimension: 'competitive_motivation', max: 1.6, weight: 1.1 }
      ]
    },
    {
      id: 'one_trick',
      name: '绝活哥',
      description: '你的英雄池不是池，是试管。无论版本怎么改、阵容多离谱、队友怎么求你，你都只信那一个英雄。你不一定赢，但你死都要死在自己最熟的那套连招上。',
      meme: '一个英雄打穿一生',
      template: { teamwork: 1.1, resilience: 2.1, elo_attitude: 1.3, hero_flexibility: 1.0, chat_behavior: 1.1, competitive_motivation: 1.6, mechanism_exploit: 1.0, blame_tendency: 1.8, skill_pursuit: 3.0 },
      constraints: [
        { dimension: 'hero_flexibility', max: 1.3, hard: true },
        { dimension: 'skill_pursuit', min: 2.6, hard: true }
      ]
    },
    {
      id: 'smurf_addict',
      name: '炸鱼成瘾者',
      description: '你享受的不是上分，而是虐菜。小号、双排、乱杀、截图发群，一套流程行云流水。你对“高质量对局”没兴趣，你只想确认自己在低分段依然像个神。',
      meme: '鱼塘霸主，深海废物',
      template: { teamwork: 1.3, resilience: 2.3, elo_attitude: 1.1, hero_flexibility: 1.6, chat_behavior: 1.4, competitive_motivation: 2.6, mechanism_exploit: 1.2, blame_tendency: 1.8, skill_pursuit: 3.0 },
      constraints: [
        { dimension: 'skill_pursuit', min: 2.6, hard: true },
        { dimension: 'competitive_motivation', min: 2.4, weight: 1.1 },
        { dimension: 'hero_flexibility', max: 2.0, weight: 1.1 }
      ]
    },
    {
      id: 'rotten_immortal',
      name: '摆烂仙人',
      description: '你的心态平和得像已经看破生死。队友对喷你看热闹，逆风被推你说“挺好”，输了也像没事人一样去开下一把。你不一定强，但你很难被气死。',
      meme: '峡谷观光团终身会员',
      template: { teamwork: 2.1, resilience: 1.7, elo_attitude: 1.0, hero_flexibility: 1.9, chat_behavior: 1.0, competitive_motivation: 1.0, mechanism_exploit: 1.0, blame_tendency: 1.0, skill_pursuit: 1.1 },
      constraints: [
        { dimension: 'competitive_motivation', max: 1.4, hard: true },
        { dimension: 'chat_behavior', max: 1.4, weight: 1.1 }
      ]
    },
    {
      id: 'skin_warrior',
      name: 'V10皮肤战神',
      description: '你的皮肤仓库像军火库，加载页面像走红毯，但一进对局就开始表演花钱受苦。你不一定菜，只是你总能把“我花了这么多钱怎么还能输”这件事表现得特别有戏剧性。',
      meme: '典藏在手，队友发抖',
      template: { teamwork: 1.3, resilience: 1.4, elo_attitude: 1.7, hero_flexibility: 1.6, chat_behavior: 2.8, competitive_motivation: 1.7, mechanism_exploit: 1.0, blame_tendency: 2.9, skill_pursuit: 1.1 },
      constraints: [
        { dimension: 'chat_behavior', min: 2.5, hard: true },
        { dimension: 'blame_tendency', min: 2.5, hard: true }
      ]
    },
    {
      id: 'rank_slave',
      name: '分奴之王',
      description: '上分对你来说不是娱乐，是 KPI。你会看版本榜、补阵容、抄出装、算胜率，任何能提高赢面的方法你都想榨干。别人打游戏图开心，你打游戏像在冲业绩。',
      meme: '赢了就是一切，快乐以后再说',
      template: { teamwork: 2.8, resilience: 2.6, elo_attitude: 1.1, hero_flexibility: 3.0, chat_behavior: 1.0, competitive_motivation: 3.0, mechanism_exploit: 1.2, blame_tendency: 1.2, skill_pursuit: 2.1 },
      constraints: [
        { dimension: 'competitive_motivation', min: 2.8, hard: true },
        { dimension: 'hero_flexibility', min: 2.7, hard: true },
        { dimension: 'teamwork', min: 2.4, hard: true },
        { dimension: 'chat_behavior', max: 1.4, hard: true }
      ]
    }
  ],
  dimensionWeights: {
    competitive_motivation: 1.25,
    resilience: 1.15,
    mechanism_exploit: 1.2,
    skill_pursuit: 1.15,
    blame_tendency: 1.15,
    elo_attitude: 1.1,
    hero_flexibility: 1.1,
    chat_behavior: 1.05,
    teamwork: 1.0
  },
  acceptanceCases: [
    {
      id: 'case-prisoner',
      label: '被系统迫害的赛博犯人',
      expectedType: 'prisoner',
      answers: { q1: 'b', q2: 'b', q3: 'b', q4: 'c', q5: 'b', q6: 'c', q7: 'b', q8: 'a', q9: 'b', q10: 'a' }
    },
    {
      id: 'case-unearned',
      label: '钻系统空子混分的狗东西',
      expectedType: 'unearned',
      answers: { q1: 'b', q2: 'c', q3: 'b', q4: 'c', q5: 'c', q6: 'b', q7: 'c', q8: 'c', q9: 'c', q10: 'c' }
    },
    {
      id: 'case-ai-bot',
      label: '疑似混入人类排位的人机',
      expectedType: 'ai_bot',
      answers: { q1: 'c', q2: 'c', q3: 'c', q4: 'b', q5: 'a', q6: 'b', q7: 'c', q8: 'b', q9: 'c', q10: 'a' }
    },
    {
      id: 'case-surrender',
      label: '投降按钮代言人',
      expectedType: 'surrender',
      answers: { q1: 'c', q2: 'b', q3: 'c', q4: 'b', q5: 'a', q6: 'b', q7: 'b', q8: 'b', q9: 'c', q10: 'a' }
    },
    {
      id: 'case-one-trick',
      label: '英雄池只有一个格子的绝活哥',
      expectedType: 'one_trick',
      answers: { q1: 'b', q2: 'c', q3: 'b', q4: 'b', q5: 'b', q6: 'a', q7: 'c', q8: 'a', q9: 'a', q10: 'b' }
    },
    {
      id: 'case-smurf',
      label: '虐菜上头的小号战神',
      expectedType: 'smurf_addict',
      answers: { q1: 'a', q2: 'c', q3: 'a', q4: 'b', q5: 'b', q6: 'a', q7: 'c', q8: 'a', q9: 'a', q10: 'b' }
    },
    {
      id: 'case-rotten',
      label: '峡谷观光型摆烂仙人',
      expectedType: 'rotten_immortal',
      answers: { q1: 'c', q2: 'a', q3: 'c', q4: 'b', q5: 'a', q6: 'a', q7: 'a', q8: 'b', q9: 'a', q10: 'a' }
    },
    {
      id: 'case-skin',
      label: '皮肤越贵嘴越臭的金主',
      expectedType: 'skin_warrior',
      answers: { q1: 'a', q2: 'b', q3: 'b', q4: 'b', q5: 'a', q6: 'c', q7: 'b', q8: 'b', q9: 'b', q10: 'a' }
    },
    {
      id: 'case-rank-slave',
      label: '为了星星愿意当牛做马的分奴',
      expectedType: 'rank_slave',
      answers: { q1: 'a', q2: 'a', q3: 'a', q4: 'b', q5: 'c', q6: 'a', q7: 'a', q8: 'a', q9: 'a', q10: 'b' }
    }
  ]
};

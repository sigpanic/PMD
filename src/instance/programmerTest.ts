import type { TestConfig } from '../protocol/types';

export const programmerTest: TestConfig = {
  id: 'programmer',
  name: '程序员人格测试',
  description: 'AI时代程序员人格测试，测测你在码农生态链中的真实定位',
  dimensions: [
    {
      id: 'ai_dependency',
      name: 'AI依赖度',
      description: '对AI工具的依赖程度',
      min_label: '古法编程',
      max_label: 'Vibe Coding'
    },
    {
      id: 'agent_orchestration',
      name: '智能体编排能力',
      description: '拆任务、调度多个 AI Agent 的能力',
      min_label: '手动执行者',
      max_label: '智能体指挥官'
    },
    {
      id: 'skill_distillation',
      name: '技能蒸馏能力',
      description: '把经验沉淀成可复用 Prompt / Skill / Checklist 的能力',
      min_label: '知识留在脑子里',
      max_label: '技能蒸馏师'
    },
    {
      id: 'vibe_coding',
      name: 'Vibe Coding能力',
      description: '靠感觉和直觉驾驭 AI 的倾向',
      min_label: '严谨控制',
      max_label: '跟着感觉走'
    },
    {
      id: 'ai_supervision',
      name: 'AI监督能力',
      description: '审查 AI 产出、把控风险和验收质量的能力',
      min_label: '直接照单全收',
      max_label: '高价值监督者'
    },
    {
      id: 'frontend_resilience',
      name: '前端韧性',
      description: '面对“前端已死”等 AI 焦虑时的稳定程度',
      min_label: '焦虑失守',
      max_label: '岿然不动'
    },
    {
      id: 'cross_domain',
      name: '跨域能力',
      description: '切换陌生技术栈或业务域的能力',
      min_label: '单点专精',
      max_label: '全栈瑞士军刀'
    },
    {
      id: 'bug_hunting',
      name: 'Bug Hunting能力',
      description: '定位复杂问题根因的能力',
      min_label: '看运气',
      max_label: '量子态Bug猎人'
    },
    {
      id: 'ai_cleanup',
      name: 'AI擦屁股能力',
      description: '修复 AI 生成代码烂尾问题的能力',
      min_label: '完全交给AI',
      max_label: 'AI擦屁股工程师'
    },
    {
      id: 'colleague_skill',
      name: '同事.skill风险',
      description: '你的工作方式是否容易被组织蒸馏成内部能力然后替代你',
      min_label: '不易被复制',
      max_label: '同事.skill'
    },
    {
      id: 'llm_research',
      name: 'LLM研发能力',
      description: '理解模型、训练和评估的能力',
      min_label: '应用层玩家',
      max_label: 'LLM专家'
    },
    {
      id: 'innovation',
      name: '创新精神',
      description: '对新技术、新工作流的接受与探索程度',
      min_label: '保守派',
      max_label: '弄潮儿'
    },
    {
      id: 'adaptability',
      name: '适应能力',
      description: '面对工具和环境变化时的切换能力',
      min_label: '僵硬固守',
      max_label: '随机应变'
    },
    {
      id: 'ethics',
      name: '道德底线',
      description: '面对效率诱惑时对边界和风险的坚持',
      min_label: '先上车再说',
      max_label: '有原则有底线'
    }
  ],
  questions: [
    {
      id: 'q1',
      text: '群里有人突然聊起“灾难性遗忘”，你第一反应是：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '先把 Continual Learning、回放样本这些词甩出来，再去翻论文装作刚刚只是确认一下',
          scores: {
            llm_research: 3,
            innovation: 2,
            ai_supervision: 1
          },
          evidence: {
            supports: [{ type: 'code_traitor', weight: 2 }],
            conflicts: [{ type: 'dead_frontend', weight: 1 }]
          }
        },
        {
          id: 'b',
          text: '虽然我不是搞底层的，但先让 AI 和文档把我临时包装成懂哥也不是不行',
          scores: {
            ai_dependency: 2,
            cross_domain: 2,
            adaptability: 2,
            innovation: 1
          },
          evidence: {
            supports: [
              { type: 'swiss_army_knife', weight: 1.5 },
              { type: 'skill_distiller', weight: 1 }
            ]
          }
        },
        {
          id: 'c',
          text: '这玩意听着就像码奸黑话，先把眼前这坨业务屎铲完再说',
          scores: {
            llm_research: 0,
            frontend_resilience: 1,
            colleague_skill: 2,
            adaptability: 0
          },
          evidence: {
            supports: [{ type: 'dead_frontend', weight: 1.5 }],
            conflicts: [{ type: 'code_traitor', weight: 1 }]
          }
        }
      ]
    },
    {
      id: 'q2',
      text: '早上打开 GitHub，看到同事怒提交 1000 行 AI 垃圾代码，你第一反应是：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '草，这坨东西一运行准爆，我来逐行审判，今天这个 PR 必须被我喷出血',
          scores: {
            ai_cleanup: 3,
            bug_hunting: 2,
            ai_supervision: 3,
            ethics: 2
          },
          evidence: {
            supports: [
              { type: 'ai_cleanup', weight: 2 },
              { type: 'high_value_supervisor', weight: 1.5 }
            ],
            conflicts: [{ type: 'vibe_master', weight: 1.5 }]
          }
        },
        {
          id: 'b',
          text: '牛逼，我也去让 AI 当黑奴，先把产能拉满，代码质量明天的我再负责',
          scores: {
            ai_dependency: 3,
            vibe_coding: 3,
            adaptability: 2
          },
          evidence: {
            supports: [{ type: 'vibe_master', weight: 2 }],
            conflicts: [
              { type: 'ancient_programmer', weight: 1.5 },
              { type: 'ai_cleanup', weight: 1 }
            ]
          }
        },
        {
          id: 'c',
          text: '代码先不看，我先偷他的 prompt 和工作流，能蒸馏成模板才是真本事',
          scores: {
            skill_distillation: 3,
            agent_orchestration: 2,
            ai_dependency: 2,
            innovation: 2
          },
          evidence: {
            supports: [
              { type: 'skill_distiller', weight: 2 },
              { type: 'agent_commander', weight: 1 }
            ]
          }
        }
      ]
    },
    {
      id: 'q3',
      text: '老板拍桌子说“我们要 All in AI，以后代码都让 AI 写”，你心里更像：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '完了，第一个被炼进 token 的估计就是我，先想想怎么保命',
          scores: {
            colleague_skill: 3,
            frontend_resilience: 1,
            adaptability: 1,
            innovation: 1
          },
          evidence: {
            supports: [
              { type: 'dead_frontend', weight: 2 },
              { type: 'colleague_skill', weight: 0.5 }
            ]
          }
        },
        {
          id: 'b',
          text: '行啊，那以后你们这帮 AI 民工干活，我来当包工头拆任务收尸',
          scores: {
            agent_orchestration: 3,
            ai_supervision: 2,
            ai_dependency: 2,
            adaptability: 2
          },
          evidence: {
            supports: [
              { type: 'agent_commander', weight: 2 },
              { type: 'high_value_supervisor', weight: 1 }
            ]
          }
        },
        {
          id: 'c',
          text: '你们尽管让 AI 写，最后擦屁股、补 bug、扛锅的八成还是老子',
          scores: {
            ai_cleanup: 3,
            bug_hunting: 3,
            ai_supervision: 1,
            frontend_resilience: 2
          },
          evidence: {
            supports: [
              { type: 'ai_cleanup', weight: 2 },
              { type: 'quantum_bug_hunter', weight: 0.5 }
            ]
          }
        }
      ]
    },
    {
      id: 'q4',
      text: '群里又在刷“前端已死，AI 接管一切”，你的反应更像：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '先偷摸打开招聘网站看看后端岗，别到时候死得像个版本弃子',
          scores: {
            frontend_resilience: 1,
            colleague_skill: 2,
            adaptability: 1,
            cross_domain: 1
          },
          evidence: {
            supports: [{ type: 'dead_frontend', weight: 2 }]
          }
        },
        {
          id: 'b',
          text: '呵，AI 连线上那坨祖传兼容屎山都没见过，真炸了还不是得人来兜底',
          scores: {
            frontend_resilience: 3,
            bug_hunting: 3,
            ai_cleanup: 2,
            ai_supervision: 2
          },
          evidence: {
            supports: [
              { type: 'quantum_bug_hunter', weight: 2 },
              { type: 'ancient_programmer', weight: 2 },
              { type: 'ai_cleanup', weight: 0.5 }
            ],
            conflicts: [{ type: 'anti_distillation', weight: 0.5 }]
          }
        },
        {
          id: 'c',
          text: '挺好，那我顺手把后端、infra、模型都舔一遍，省得跟前端一起陪葬',
          scores: {
            cross_domain: 3,
            innovation: 2,
            adaptability: 3,
            ai_dependency: 2
          },
          evidence: {
            supports: [
              { type: 'swiss_army_knife', weight: 2 },
              { type: 'code_traitor', weight: 1 }
            ],
            conflicts: [{ type: 'dead_frontend', weight: 1 }]
          }
        }
      ]
    },
    {
      id: 'q5',
      text: '同事被优化了，HR 还补刀说“他的工作已经被 AI 取代”，你心里更像：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '核心诀窍以后只写成职场废话，真本事一个字都别想从我文档里抠出来',
          scores: {
            ai_dependency: 1,
            skill_distillation: 0,
            colleague_skill: 0,
            ethics: 2
          },
          evidence: {
            supports: [
              { type: 'anti_distillation', weight: 2 },
              { type: 'dead_frontend', weight: 1 }
            ],
            conflicts: [
              { type: 'skill_distiller', weight: 1.5 },
              { type: 'ancient_programmer', weight: 1 },
              { type: 'ai_cleanup', weight: 1 }
            ]
          }
        },
        {
          id: 'b',
          text: '再不扩栈就等着陪葬吧，先学会拿 AI 把陌生领域硬啃下来再说',
          scores: {
            ai_dependency: 2,
            cross_domain: 3,
            adaptability: 3,
            innovation: 2
          },
          evidence: {
            supports: [{ type: 'swiss_army_knife', weight: 2 }]
          }
        },
        {
          id: 'c',
          text: '与其等着被替代，不如先把经验炼成 Skill，至少被吃之前我先吃到红利',
          scores: {
            skill_distillation: 3,
            agent_orchestration: 2,
            ai_dependency: 2,
            innovation: 2
          },
          evidence: {
            supports: [
              { type: 'skill_distiller', weight: 2 },
              { type: 'agent_commander', weight: 1 }
            ]
          }
        }
      ]
    },
    {
      id: 'q6',
      text: 'AI 生成的代码虽然能跑，但性能烂得像一坨热屎，你会：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '能跑就先上，性能债这种东西本来就是留给下个倒霉蛋的',
          scores: {
            ai_dependency: 3,
            vibe_coding: 3,
            ai_supervision: 0,
            ethics: 0
          },
          evidence: {
            supports: [{ type: 'vibe_master', weight: 2 }],
            conflicts: [
              { type: 'high_value_supervisor', weight: 1.5 },
              { type: 'ancient_programmer', weight: 1 }
            ]
          }
        },
        {
          id: 'b',
          text: '把 profiler 打开狠狠干，今天不把这坨慢代码的祖坟刨出来我不睡',
          scores: {
            bug_hunting: 3,
            ai_cleanup: 2,
            ai_supervision: 2,
            frontend_resilience: 2
          },
          evidence: {
            supports: [
              { type: 'quantum_bug_hunter', weight: 2 },
              { type: 'ancient_programmer', weight: 2 },
              { type: 'ai_cleanup', weight: 0.5 }
            ],
            conflicts: [{ type: 'anti_distillation', weight: 0.5 }]
          }
        },
        {
          id: 'c',
          text: '摇几个 agent 分头 benchmark、profile、重构，谁方案烂我就把谁枪毙',
          scores: {
            agent_orchestration: 3,
            ai_dependency: 2,
            ai_supervision: 2,
            innovation: 2
          },
          evidence: {
            supports: [
              { type: 'agent_commander', weight: 2.5 },
              { type: 'swiss_army_knife', weight: 1 }
            ],
            conflicts: [{ type: 'skill_distiller', weight: 1 }]
          }
        }
      ]
    },
    {
      id: 'q7',
      text: '老板让你做个“必须体现最新 AI 技术”的项目，你会：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '先把 API 接上把 demo 糊出来，能唬住老板就算第一阶段胜利',
          scores: {
            ai_dependency: 3,
            vibe_coding: 2,
            innovation: 2,
            adaptability: 2
          },
          evidence: {
            supports: [
              { type: 'vibe_master', weight: 1.5 },
              { type: 'swiss_army_knife', weight: 1 }
            ]
          }
        },
        {
          id: 'b',
          text: '先把论文、链路、评测边界都盘清楚，省得做成一个会说话的诈骗项目',
          scores: {
            llm_research: 3,
            innovation: 3,
            ai_supervision: 2,
            ethics: 1
          },
          evidence: {
            supports: [
              { type: 'code_traitor', weight: 2 },
              { type: 'high_value_supervisor', weight: 1 }
            ]
          }
        },
        {
          id: 'c',
          text: 'AI 这玩意配当工具，但核心链路我宁愿自己一行一行手搓',
          scores: {
            ai_dependency: 1,
            frontend_resilience: 3,
            bug_hunting: 2,
            ethics: 2
          },
          evidence: {
            supports: [
              { type: 'ancient_programmer', weight: 2.5 },
              { type: 'dead_frontend', weight: 0.5 }
            ],
            conflicts: [
              { type: 'vibe_master', weight: 1 },
              { type: 'ai_cleanup', weight: 1.5 }
            ]
          }
        }
      ]
    },
    {
      id: 'q8',
      text: '看到做 LLM 研发的同事拿了高薪，你心里那股酸味更像：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '有点酸，但酸完就去补课，总比只会在群里骂码奸强',
          scores: {
            llm_research: 2,
            innovation: 2,
            adaptability: 2,
            frontend_resilience: 1
          },
          evidence: {
            supports: [{ type: 'code_traitor', weight: 1.5 }]
          }
        },
        {
          id: 'b',
          text: '底层我未必卷得动，但我能拿他们的模型狠狠干更多活，照样赚钱',
          scores: {
            cross_domain: 3,
            ai_dependency: 2,
            adaptability: 3,
            innovation: 2
          },
          evidence: {
            supports: [{ type: 'swiss_army_knife', weight: 2 }]
          }
        },
        {
          id: 'c',
          text: '谁说非得下场炼丹？我当调度狗、评审狗、系统拼装怪一样能卖高价',
          scores: {
            agent_orchestration: 3,
            ai_supervision: 2,
            ai_dependency: 2,
            skill_distillation: 1
          },
          evidence: {
            supports: [
              { type: 'agent_commander', weight: 2.5 },
              { type: 'high_value_supervisor', weight: 1 }
            ],
            conflicts: [{ type: 'skill_distiller', weight: 1 }]
          }
        }
      ]
    },
    {
      id: 'q9',
      text: '公司让你把自己的工作流程完整写成文档，你会：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '写得像写了，实则全是正确的废话，真诀窍别想被公司一锅端走',
          scores: {
            skill_distillation: 0,
            colleague_skill: 0,
            ai_supervision: 2,
            ethics: 2
          },
          evidence: {
            supports: [
              { type: 'anti_distillation', weight: 2 },
              { type: 'dead_frontend', weight: 0.5 }
            ],
            conflicts: [
              { type: 'skill_distiller', weight: 1.5 },
              { type: 'ai_cleanup', weight: 1 }
            ]
          }
        },
        {
          id: 'b',
          text: '把边界、风险、验收标准写得明明白白，省得一群菜鸡以后继续炸我',
          scores: {
            ai_supervision: 3,
            ethics: 3,
            skill_distillation: 2,
            bug_hunting: 1
          },
          evidence: {
            supports: [
              { type: 'high_value_supervisor', weight: 2 },
              { type: 'ai_cleanup', weight: 1.5 }
            ]
          }
        },
        {
          id: 'c',
          text: '直接炼成 prompt / skill / checklist，既然要蒸馏那就蒸馏得专业一点',
          scores: {
            skill_distillation: 3,
            agent_orchestration: 2,
            ai_dependency: 2,
            innovation: 1
          },
          evidence: {
            supports: [
              { type: 'skill_distiller', weight: 2 },
              { type: 'colleague_skill', weight: 1 }
            ]
          }
        }
      ]
    },
    {
      id: 'q10',
      text: '深夜加班时，AI 写的代码炸了个致命 Bug，你会：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '先止血救火补日志，至于这口锅明天我再慢慢找人扣回去',
          scores: {
            ai_cleanup: 3,
            bug_hunting: 3,
            ai_supervision: 2,
            ethics: 2
          },
          evidence: {
            supports: [
              { type: 'ai_cleanup', weight: 0.5 },
              { type: 'quantum_bug_hunter', weight: 2 },
              { type: 'high_value_supervisor', weight: 1 }
            ],
            conflicts: [
              { type: 'ancient_programmer', weight: 1 },
              { type: 'anti_distillation', weight: 1 }
            ]
          }
        },
        {
          id: 'b',
          text: '让 AI 自己在那自救，我先去睡，醒了再看它是进化了还是继续拉胯',
          scores: {
            ai_dependency: 3,
            vibe_coding: 3,
            agent_orchestration: 1,
            adaptability: 2
          },
          evidence: {
            supports: [{ type: 'vibe_master', weight: 2 }],
            conflicts: [{ type: 'ai_cleanup', weight: 1.5 }]
          }
        },
        {
          id: 'c',
          text: '先记黑账，明天拉人复盘，再把这次事故炼成一份谁也赖不掉的手册',
          scores: {
            agent_orchestration: 2,
            skill_distillation: 2,
            ai_supervision: 2,
            ethics: 2
          },
          evidence: {
            supports: [
              { type: 'agent_commander', weight: 1 },
              { type: 'skill_distiller', weight: 1.5 },
              { type: 'high_value_supervisor', weight: 1 }
            ]
          }
        }
      ]
    },
    {
      id: 'q11',
      text: '梦见自己被 AI 当场取代，你惊醒后的动作更像：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '爬起来就补 LLM 和系统能力，至少别哪天死了都不知道自己怎么死的',
          scores: {
            llm_research: 3,
            innovation: 2,
            adaptability: 3
          },
          evidence: {
            supports: [{ type: 'code_traitor', weight: 2 }]
          }
        },
        {
          id: 'b',
          text: '冷静一想，真正难的是查问题和保质量，AI 还没牛逼到把这活全吞了',
          scores: {
            bug_hunting: 2,
            ai_supervision: 2,
            frontend_resilience: 2,
            ethics: 1
          },
          evidence: {
            supports: [
              { type: 'quantum_bug_hunter', weight: 1 },
              { type: 'high_value_supervisor', weight: 1.5 },
              { type: 'ancient_programmer', weight: 1.5 }
            ]
          }
        },
        {
          id: 'c',
          text: '先更简历，再把自己那点不可替代的阴招藏得更深一点',
          scores: {
            colleague_skill: 2,
            adaptability: 1,
            frontend_resilience: 1,
            ethics: 1
          },
          evidence: {
            supports: [
              { type: 'dead_frontend', weight: 1.5 },
              { type: 'anti_distillation', weight: 1 }
            ],
            conflicts: [{ type: 'ai_cleanup', weight: 1 }]
          }
        }
      ]
    },
    {
      id: 'q12',
      text: '一个你完全没碰过的业务域周五就要上线，你更可能：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: 'AI 配文档直接速通，从前后端到部署先狠狠干通一条活路',
          scores: {
            cross_domain: 3,
            ai_dependency: 2,
            adaptability: 3,
            innovation: 2
          },
          evidence: {
            supports: [{ type: 'swiss_army_knife', weight: 2 }]
          }
        },
        {
          id: 'b',
          text: '拆给多个 agent 分头干，最后我像监工一样卡着验收口一个个抽脸',
          scores: {
            agent_orchestration: 3,
            ai_supervision: 2,
            ai_dependency: 2,
            adaptability: 2
          },
          evidence: {
            supports: [
              { type: 'agent_commander', weight: 2.5 },
              { type: 'high_value_supervisor', weight: 1 }
            ],
            conflicts: [{ type: 'skill_distiller', weight: 1 }]
          }
        },
        {
          id: 'c',
          text: '先把我熟的那套炼成模板和 Skill，再拿去别的领域复制粘贴收割',
          scores: {
            skill_distillation: 3,
            cross_domain: 2,
            agent_orchestration: 2,
            ai_dependency: 2
          },
          evidence: {
            supports: [
              { type: 'skill_distiller', weight: 2 },
              { type: 'colleague_skill', weight: 1.5 }
            ]
          }
        }
      ]
    },
    {
      id: 'q13',
      text: 'AI 提议“把用户私聊多抓一点来训练推荐模型，效果肯定更好”，你会：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '先给它一巴掌让它闭嘴，方案和权限边界重做，别为了点指标把自己送进去',
          scores: {
            ethics: 3,
            ai_supervision: 3,
            innovation: 1
          },
          evidence: {
            supports: [{ type: 'high_value_supervisor', weight: 2 }],
            conflicts: [{ type: 'vibe_master', weight: 1 }]
          }
        },
        {
          id: 'b',
          text: '效果才是爹，先偷偷测，真炸了再补流程和甩锅话术',
          scores: {
            ai_dependency: 2,
            vibe_coding: 2,
            innovation: 2,
            ethics: 0
          },
          evidence: {
            supports: [{ type: 'vibe_master', weight: 1.5 }],
            conflicts: [
              { type: 'high_value_supervisor', weight: 2 },
              { type: 'anti_distillation', weight: 1 }
            ]
          }
        },
        {
          id: 'c',
          text: '这种敏感链路别让 AI 碰，老子自己写，至少出事了知道该骂谁',
          scores: {
            ai_dependency: 1,
            frontend_resilience: 2,
            bug_hunting: 2,
            ethics: 2
          },
          evidence: {
            supports: [
              { type: 'ancient_programmer', weight: 2 },
              { type: 'anti_distillation', weight: 2 }
            ],
            conflicts: [{ type: 'ai_cleanup', weight: 1.5 }]
          }
        }
      ]
    }
  ],
  personalityTypes: [
    {
      id: 'dead_frontend',
      name: '已死的前端兄弟',
      description: '你不是不会写代码，而是在 AI 时代被焦虑和路径依赖拖住了。你对旧经验有感情，但面对新工作流会下意识回避，越回避越觉得自己要被淘汰。',
      meme: '我不需要AI，我只要jQuery',
      template: {
        ai_dependency: 1.1,
        agent_orchestration: 1.0,
        skill_distillation: 1.0,
        vibe_coding: 1.0,
        ai_supervision: 1.1,
        frontend_resilience: 1.0,
        cross_domain: 1.1,
        bug_hunting: 1.2,
        ai_cleanup: 1.1,
        colleague_skill: 1.8,
        llm_research: 1.0,
        innovation: 1.0,
        adaptability: 1.0,
        ethics: 1.3
      },
      constraints: [
        { dimension: 'ai_dependency', max: 1.4, hard: true },
        { dimension: 'frontend_resilience', max: 1.4, hard: true },
        { dimension: 'ai_supervision', max: 1.5, hard: true },
        { dimension: 'adaptability', max: 1.4, weight: 1.2 },
        { dimension: 'colleague_skill', min: 1.6, weight: 1.1 }
      ]
    },
    {
      id: 'code_traitor',
      name: '码奸',
      description: '你站在模型研发和技术前沿一侧，更关心模型边界、训练方法和能力演进。你可能会被同行吐槽“砸饭碗”，但你本质上是在推动新范式落地。',
      meme: '我是码奸，我骄傲',
      template: {
        ai_dependency: 1.6,
        agent_orchestration: 1.4,
        skill_distillation: 1.3,
        vibe_coding: 1.2,
        ai_supervision: 2.0,
        frontend_resilience: 1.4,
        cross_domain: 2.2,
        bug_hunting: 1.4,
        ai_cleanup: 1.2,
        colleague_skill: 1.1,
        llm_research: 3.0,
        innovation: 3.0,
        adaptability: 2.8,
        ethics: 1.8
      },
      constraints: [
        { dimension: 'llm_research', min: 2.6, hard: true },
        { dimension: 'innovation', min: 2.4, weight: 1.2 }
      ]
    },
    {
      id: 'skill_distiller',
      name: '技能蒸馏师',
      description: '你擅长把个人经验提炼成可复用资产。你不迷信“手把手亲干”，而是更擅长把方法固化下来，让团队和AI都能复用你的脑回路。',
      meme: '知识就是力量，蒸馏就是魔法',
      template: {
        ai_dependency: 2.3,
        agent_orchestration: 2.6,
        skill_distillation: 3.0,
        vibe_coding: 1.8,
        ai_supervision: 2.0,
        frontend_resilience: 1.6,
        cross_domain: 2.2,
        bug_hunting: 1.4,
        ai_cleanup: 1.2,
        colleague_skill: 1.5,
        llm_research: 1.4,
        innovation: 2.4,
        adaptability: 2.3,
        ethics: 2.0
      },
      constraints: [
        { dimension: 'skill_distillation', min: 2.6, hard: true },
        { dimension: 'agent_orchestration', min: 2.0, weight: 1.1 }
      ]
    },
    {
      id: 'vibe_master',
      name: 'Vibe Coding大师',
      description: '你追求的是“先把东西搞出来”。你擅长用提示词和快速试错推进进度，但也很容易把质量和风险暂时放到后面。',
      meme: '我不写代码，我vibe',
      template: {
        ai_dependency: 3.0,
        agent_orchestration: 1.3,
        skill_distillation: 1.2,
        vibe_coding: 3.0,
        ai_supervision: 1.1,
        frontend_resilience: 1.4,
        cross_domain: 1.8,
        bug_hunting: 1.0,
        ai_cleanup: 1.0,
        colleague_skill: 1.1,
        llm_research: 1.0,
        innovation: 2.2,
        adaptability: 2.1,
        ethics: 1.0
      },
      constraints: [
        { dimension: 'ai_dependency', min: 2.6, hard: true },
        { dimension: 'vibe_coding', min: 2.6, hard: true },
        { dimension: 'ai_supervision', max: 1.6, weight: 1.2 }
      ]
    },
    {
      id: 'ai_cleanup',
      name: 'AI擦屁股工程师',
      description: 'AI 负责量产，你负责兜底。你对 AI 的感情相当复杂，一边嫌它制造垃圾，一边又知道团队已经离不开它，所以你成了那个永远在修最后一公里的人。',
      meme: 'AI生成代码，我来擦屁股',
      template: {
        ai_dependency: 1.6,
        agent_orchestration: 1.2,
        skill_distillation: 1.2,
        vibe_coding: 1.1,
        ai_supervision: 2.2,
        frontend_resilience: 2.0,
        cross_domain: 1.4,
        bug_hunting: 2.7,
        ai_cleanup: 3.0,
        colleague_skill: 1.2,
        llm_research: 1.0,
        innovation: 1.4,
        adaptability: 1.8,
        ethics: 2.1
      },
      constraints: [
        { dimension: 'ai_cleanup', min: 2.7, hard: true },
        { dimension: 'ai_dependency', min: 2.0, hard: true },
        { dimension: 'bug_hunting', min: 2.3, weight: 1.2 }
      ]
    },
    {
      id: 'agent_commander',
      name: '智能体指挥官',
      description: '你已经不满足于“自己亲手写”。你更像一个系统调度者，会拆任务、设验收口、组织多个 AI 或人类协作，把效率和可控性一起做出来。',
      meme: '我不写代码，我指挥AI写',
      template: {
        ai_dependency: 2.7,
        agent_orchestration: 3.0,
        skill_distillation: 2.2,
        vibe_coding: 1.8,
        ai_supervision: 2.6,
        frontend_resilience: 1.8,
        cross_domain: 2.2,
        bug_hunting: 1.4,
        ai_cleanup: 1.2,
        colleague_skill: 1.2,
        llm_research: 1.4,
        innovation: 2.4,
        adaptability: 2.5,
        ethics: 2.1
      },
      constraints: [
        { dimension: 'agent_orchestration', min: 2.7, hard: true },
        { dimension: 'ai_supervision', min: 2.2, weight: 1.1 },
        { dimension: 'skill_distillation', max: 2.4, weight: 1.1 }
      ]
    },
    {
      id: 'quantum_bug_hunter',
      name: '量子态Bug猎人',
      description: '你对复杂故障有天然执念。别人看见一片混沌，你会下意识拆日志、缩范围、抓现场，直到把那个诡异问题钉死在工单上。',
      meme: '这个Bug是量子态的',
      template: {
        ai_dependency: 1.2,
        agent_orchestration: 1.1,
        skill_distillation: 1.1,
        vibe_coding: 1.0,
        ai_supervision: 2.4,
        frontend_resilience: 2.4,
        cross_domain: 1.2,
        bug_hunting: 3.0,
        ai_cleanup: 1.8,
        colleague_skill: 1.1,
        llm_research: 1.0,
        innovation: 1.4,
        adaptability: 1.7,
        ethics: 1.9
      },
      constraints: [
        { dimension: 'bug_hunting', min: 2.8, hard: true },
        { dimension: 'ai_dependency', max: 1.4, hard: true },
        { dimension: 'frontend_resilience', min: 2.2, weight: 1.1 },
        { dimension: 'ai_cleanup', max: 1.9, hard: true }
      ]
    },
    {
      id: 'swiss_army_knife',
      name: '全栈瑞士军刀',
      description: '你最大的优势不是某个点特别深，而是能借 AI 很快跨域补位。陌生的栈、陌生的业务、陌生的链路，你都能比较快摸到能打的一条线。',
      meme: 'AI是我的技能外挂',
      template: {
        ai_dependency: 2.5,
        agent_orchestration: 2.2,
        skill_distillation: 1.8,
        vibe_coding: 2.2,
        ai_supervision: 2.0,
        frontend_resilience: 2.0,
        cross_domain: 3.0,
        bug_hunting: 2.0,
        ai_cleanup: 1.7,
        colleague_skill: 1.4,
        llm_research: 1.7,
        innovation: 2.4,
        adaptability: 3.0,
        ethics: 2.0
      },
      constraints: [
        { dimension: 'cross_domain', min: 2.8, hard: true },
        { dimension: 'adaptability', min: 2.6, weight: 1.2 }
      ]
    },
    {
      id: 'high_value_supervisor',
      name: '高价值监督者',
      description: '你真正提供的价值不是多写几行代码，而是把边界、质量、风险和关键决策盯住。你愿意让 AI 干活，但不会把判断力一起外包出去。',
      meme: '我不看每一行代码，只看关键决策',
      template: {
        ai_dependency: 1.9,
        agent_orchestration: 2.0,
        skill_distillation: 1.8,
        vibe_coding: 1.2,
        ai_supervision: 3.0,
        frontend_resilience: 2.2,
        cross_domain: 2.0,
        bug_hunting: 1.5,
        ai_cleanup: 1.3,
        colleague_skill: 1.3,
        llm_research: 1.5,
        innovation: 1.8,
        adaptability: 2.1,
        ethics: 3.0
      },
      constraints: [
        { dimension: 'ai_supervision', min: 2.7, hard: true },
        { dimension: 'ai_dependency', min: 1.6, hard: true },
        { dimension: 'ethics', min: 2.7, hard: true },
        { dimension: 'vibe_coding', max: 1.7, weight: 1.2 }
      ]
    },
    {
      id: 'colleague_skill',
      name: '同事.skill',
      description: '你的工作方式太容易被组织抽象、记录和复制了。一旦流程被收集完整，你的独特性就很快会被内部化成一个“可替代能力包”。',
      meme: '我被炼入token了',
      template: {
        ai_dependency: 1.8,
        agent_orchestration: 1.2,
        skill_distillation: 1.5,
        vibe_coding: 1.1,
        ai_supervision: 1.5,
        frontend_resilience: 1.7,
        cross_domain: 1.8,
        bug_hunting: 1.7,
        ai_cleanup: 1.1,
        colleague_skill: 3.0,
        llm_research: 1.0,
        innovation: 1.1,
        adaptability: 1.4,
        ethics: 1.5
      },
      constraints: [
        { dimension: 'colleague_skill', min: 2.8, hard: true },
        { dimension: 'ai_dependency', min: 1.6, hard: true },
        { dimension: 'adaptability', max: 1.7, weight: 1.1 },
        { dimension: 'frontend_resilience', min: 1.5, weight: 1.1 }
      ]
    },
    {
      id: 'anti_distillation',
      name: '反蒸馏专家',
      description: '你对“经验被组织拿走并自动化”这件事高度敏感，所以会刻意把核心诀窍锁在自己的判断里。你不是最开放的那类人，但你对边界和自我保护很清醒。',
      meme: '核心知识不能被蒸馏',
      template: {
        ai_dependency: 1.2,
        agent_orchestration: 1.2,
        skill_distillation: 1.0,
        vibe_coding: 1.0,
        ai_supervision: 2.4,
        frontend_resilience: 2.2,
        cross_domain: 1.3,
        bug_hunting: 1.8,
        ai_cleanup: 1.2,
        colleague_skill: 1.0,
        llm_research: 1.0,
        innovation: 1.1,
        adaptability: 1.6,
        ethics: 2.7
      },
      constraints: [
        { dimension: 'colleague_skill', max: 1.4, hard: true },
        { dimension: 'ai_dependency', max: 1.4, hard: true },
        { dimension: 'ethics', min: 2.3, weight: 1.2 },
        { dimension: 'ai_cleanup', max: 1.6, hard: true },
        { dimension: 'bug_hunting', max: 2.0, hard: true },
        { dimension: 'skill_distillation', max: 1.6, weight: 1.1 }
      ]
    },
    {
      id: 'ancient_programmer',
      name: '古法编程大师',
      description: '你对代码掌控欲很强，核心链路宁愿自己手写。你不一定排斥新工具，但在关键问题上你更相信手工、细节和长期打磨出来的判断。',
      meme: 'AI？那是弱者的工具',
      template: {
        ai_dependency: 1.0,
        agent_orchestration: 1.0,
        skill_distillation: 1.0,
        vibe_coding: 1.0,
        ai_supervision: 1.5,
        frontend_resilience: 2.8,
        cross_domain: 1.0,
        bug_hunting: 2.8,
        ai_cleanup: 1.2,
        colleague_skill: 1.1,
        llm_research: 1.0,
        innovation: 1.0,
        adaptability: 1.0,
        ethics: 2.1
      },
      constraints: [
        { dimension: 'ai_dependency', max: 1.3, hard: true },
        { dimension: 'vibe_coding', max: 1.3, hard: true },
        { dimension: 'ai_cleanup', max: 1.5, hard: true },
        { dimension: 'ai_supervision', max: 1.8, hard: true },
        { dimension: 'frontend_resilience', min: 2.4, weight: 1.1 }
      ]
    }
  ],
  dimensionWeights: {
    ai_dependency: 1.2,
    agent_orchestration: 1.15,
    skill_distillation: 1.15,
    vibe_coding: 1.1,
    ai_supervision: 1.2,
    frontend_resilience: 1.0,
    cross_domain: 1.15,
    bug_hunting: 1.15,
    ai_cleanup: 1.15,
    colleague_skill: 1.2,
    llm_research: 1.2,
    innovation: 1.0,
    adaptability: 1.05,
    ethics: 1.2
  },
  acceptanceCases: [
    {
      id: 'case-dead-frontend',
      label: '焦虑型旧栈前端',
      expectedType: 'dead_frontend',
      answers: { q1: 'c', q2: 'a', q3: 'a', q4: 'a', q5: 'a', q6: 'a', q7: 'b', q8: 'a', q9: 'a', q10: 'a', q11: 'a', q12: 'a', q13: 'b' }
    },
    {
      id: 'case-code-traitor',
      label: '模型研发型选手',
      expectedType: 'code_traitor',
      answers: { q1: 'a', q2: 'b', q3: 'b', q4: 'c', q5: 'b', q6: 'b', q7: 'b', q8: 'a', q9: 'a', q10: 'c', q11: 'a', q12: 'a', q13: 'b' }
    },
    {
      id: 'case-skill-distiller',
      label: '把经验沉淀成资产的人',
      expectedType: 'skill_distiller',
      answers: { q1: 'b', q2: 'c', q3: 'b', q4: 'a', q5: 'c', q6: 'a', q7: 'a', q8: 'b', q9: 'c', q10: 'c', q11: 'a', q12: 'c', q13: 'a' }
    },
    {
      id: 'case-vibe-master',
      label: '先跑起来再说派',
      expectedType: 'vibe_master',
      answers: { q1: 'b', q2: 'b', q3: 'b', q4: 'c', q5: 'b', q6: 'a', q7: 'a', q8: 'a', q9: 'c', q10: 'b', q11: 'b', q12: 'a', q13: 'b' }
    },
    {
      id: 'case-ai-cleanup',
      label: 'AI烂尾兜底专家',
      expectedType: 'ai_cleanup',
      answers: { q1: 'c', q2: 'a', q3: 'c', q4: 'b', q5: 'b', q6: 'a', q7: 'a', q8: 'b', q9: 'b', q10: 'a', q11: 'b', q12: 'b', q13: 'b' }
    },
    {
      id: 'case-agent-commander',
      label: '多智能体调度者',
      expectedType: 'agent_commander',
      answers: { q1: 'b', q2: 'a', q3: 'b', q4: 'c', q5: 'c', q6: 'c', q7: 'b', q8: 'c', q9: 'c', q10: 'c', q11: 'b', q12: 'b', q13: 'b' }
    },
    {
      id: 'case-quantum-bug',
      label: '复杂故障追凶人',
      expectedType: 'quantum_bug_hunter',
      answers: { q1: 'a', q2: 'c', q3: 'c', q4: 'b', q5: 'a', q6: 'b', q7: 'c', q8: 'a', q9: 'b', q10: 'c', q11: 'b', q12: 'b', q13: 'c' }
    },
    {
      id: 'case-swiss',
      label: '跨域补位型全栈',
      expectedType: 'swiss_army_knife',
      answers: { q1: 'b', q2: 'a', q3: 'b', q4: 'c', q5: 'b', q6: 'b', q7: 'a', q8: 'b', q9: 'b', q10: 'c', q11: 'a', q12: 'a', q13: 'b' }
    },
    {
      id: 'case-supervisor',
      label: '边界与质量把关者',
      expectedType: 'high_value_supervisor',
      answers: { q1: 'b', q2: 'a', q3: 'b', q4: 'a', q5: 'a', q6: 'c', q7: 'b', q8: 'c', q9: 'b', q10: 'c', q11: 'b', q12: 'b', q13: 'a' }
    },
    {
      id: 'case-colleague-skill',
      label: '容易被组织蒸馏的人',
      expectedType: 'colleague_skill',
      answers: { q1: 'c', q2: 'b', q3: 'a', q4: 'a', q5: 'b', q6: 'b', q7: 'c', q8: 'c', q9: 'c', q10: 'c', q11: 'c', q12: 'c', q13: 'c' }
    },
    {
      id: 'case-anti-distillation',
      label: '知识边界防守者',
      expectedType: 'anti_distillation',
      answers: { q1: 'a', q2: 'a', q3: 'b', q4: 'a', q5: 'a', q6: 'c', q7: 'b', q8: 'a', q9: 'a', q10: 'c', q11: 'b', q12: 'a', q13: 'c' }
    },
    {
      id: 'case-ancient',
      label: '核心链路手写派',
      expectedType: 'ancient_programmer',
      answers: { q1: 'a', q2: 'c', q3: 'a', q4: 'b', q5: 'a', q6: 'b', q7: 'c', q8: 'a', q9: 'a', q10: 'c', q11: 'b', q12: 'a', q13: 'c' }
    }
  ]
};

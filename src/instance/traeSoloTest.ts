import type { TestConfig } from '../protocol/types';

export const traeSoloTest: TestConfig = {
  id: 'trae-solo',
  name: 'Trae Solo 用户人格测试',
  description: '测测你在Trae Solo AI开发世界中的真实定位——是SOLO布道师还是微操管理者？',
  imageUrl: '/PMD/images/trae-solo.png',
  dimensions: [
    {
      id: 'solo_dependency',
      name: 'SOLO依赖度',
      description: '对SOLO模式全流程自主开发的依赖程度',
      min_label: '手动控制狂',
      max_label: 'SOLO信仰者'
    },
    {
      id: 'prompt_mastery',
      name: 'Prompt工程能力',
      description: '编写高质量自然语言指令的能力',
      min_label: '随口一说',
      max_label: '提示词艺术家'
    },
    {
      id: 'task_decomposition',
      name: '任务拆解能力',
      description: '将复杂需求分解为可执行步骤的能力',
      min_label: '一锅端',
      max_label: '结构化拆解大师'
    },
    {
      id: 'ai_supervision',
      name: 'AI监督能力',
      description: '审查AI输出、把控质量和风险的能力',
      min_label: '照单全收',
      max_label: '严苛审查官'
    },
    {
      id: 'control_desire',
      name: '控制欲强度',
      description: '对代码掌控和干预的需求程度',
      min_label: '放手让AI干',
      max_label: '每行都要看'
    },
    {
      id: 'innovation_spirit',
      name: '创新探索精神',
      description: '尝试新功能、新工作流和新工具的积极性',
      min_label: '保守派',
      max_label: '弄潮儿'
    },
    {
      id: 'efficiency_priority',
      name: '效率优先级',
      description: '追求快速交付还是精益求精',
      min_label: '质量至上',
      max_label: '先跑再说'
    },
    {
      id: 'context_engineering',
      name: '上下文工程能力',
      description: '利用代码仓库、文档、网页等多模态上下文的能力',
      min_label: '纯文本输入',
      max_label: '上下文编织者'
    },
    {
      id: 'risk_tolerance',
      name: '风险承受能力',
      description: '对AI生成代码质量和安全性的信任程度',
      min_label: '疑神疑鬼',
      max_label: '大胆托付'
    },
    {
      id: 'learning_adaptability',
      name: '学习适应能力',
      description: '快速掌握新工具和工作流变更的能力',
      min_label: '固守旧习',
      max_label: '快速进化'
    }
  ],
  questions: [
    {
      id: 'q1',
      text: '早上10点半打开Trae Solo，屏幕上赫然显示"前方排队2000+"，你的第一反应是：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '切IDE模式凑合用吧，反正SOLO模式也就是个噱头，等它不排了再说',
          scores: {
            solo_dependency: 0.5,
            efficiency_priority: 2,
            risk_tolerance: 1,
            control_desire: 2
          },
          evidence: {
            supports: [{ type: 'conservative_coder', weight: 2 }],
            conflicts: [{ type: 'solo_evangelist', weight: 2 }]
          }
        },
        {
          id: 'b',
          text: '打开设置换轻量模型（GLM-4.7），排队算什么？能用才是硬道理',
          scores: {
            innovation_spirit: 2,
            learning_adaptability: 2,
            efficiency_priority: 3,
            prompt_mastery: 1.5
          },
          evidence: {
            supports: [
              { type: 'rapid_prototyper', weight: 2 },
              { type: 'rapid_prototyper', weight: 1.5 }
            ]
          }
        },
        {
          id: 'c',
          text: '999元/月优速通？告辞！老子宁可排队也不当冤大头，大不了错峰晚上来',
          scores: {
            solo_dependency: 2,
            efficiency_priority: 1,
            risk_tolerance: 2,
            control_desire: 2.5
          },
          evidence: {
            supports: [
              { type: 'balanced_practitioner', weight: 1.5 },
              { type: 'conservative_coder', weight: 2 }
            ],
            conflicts: [{ type: 'solo_evangelist', weight: 1.5 }]
          }
        }
      ]
    },
    {
      id: 'q2',
      text: 'SOLO Coder跑了半小时，突然卡在"思考中"不动了，点击停止按钮也没反应，你已经卡了快2小时，你会：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '强制刷新浏览器、清Local Storage、重启IDE——这套流程我已经背下来了',
          scores: {
            control_desire: 2.5,
            ai_supervision: 2,
            learning_adaptability: 2,
            solo_dependency: 1.5
          },
          evidence: {
            supports: [
              { type: 'micro_manager', weight: 2 },
              { type: 'micro_manager', weight: 1.5 }
            ],
            conflicts: [{ type: 'solo_evangelist', weight: 2 }]
          }
        },
        {
          id: 'b',
          text: '算了算了，这坨代码大概率已经丢了（6267行变398行的教训还历历在目），重新开任务吧',
          scores: {
            solo_dependency: 2.5,
            efficiency_priority: 2.5,
            risk_tolerance: 2.5,
            ai_supervision: 0.5
          },
          evidence: {
            supports: [
              { type: 'solo_evangelist', weight: 1.5 },
              { type: 'rapid_prototyper', weight: 2 }
            ],
            conflicts: [{ type: 'quality_pursuer', weight: 1.5 }]
          }
        },
        {
          id: 'c',
          text: '去官方社区发帖吐槽（第30个回复的热帖），顺便看看有没有人遇到同样的问题',
          scores: {
            context_engineering: 2,
            task_decomposition: 1.5,
            learning_adaptability: 2.5,
            prompt_mastery: 1.8
          },
          evidence: {
            supports: [
              { type: 'context_master', weight: 1.5 },
              { type: 'context_master', weight: 2 }
            ]
          }
        }
      ]
    },
    {
      id: 'q3',
      text: '你用MTC模式让AI写了个PRD，切换到Code模式继续开发，结果发现MTC的任务消失了，你的心情是：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '？？？Trae你是不是在玩我？任务说没就没？我的PRD呢？？',
          scores: {
            solo_dependency: 1.5,
            control_desire: 3,
            ai_supervision: 2.5,
            risk_tolerance: 1
          },
          evidence: {
            supports: [
              { type: 'conservative_coder', weight: 2 },
              { type: 'micro_manager', weight: 1.5 }
            ],
            conflicts: [{ type: 'solo_evangelist', weight: 2 }]
          }
        },
        {
          id: 'b',
          text: '淡定，这已经是已知Bug了（80+条反馈），下次记得先保存再切模式',
          scores: {
            context_engineering: 2.5,
            task_decomposition: 2,
            learning_adaptability: 2.5,
            ai_supervision: 2
          },
          evidence: {
            supports: [
              { type: 'context_master', weight: 2 },
              { type: 'structured_planner', weight: 1.5 }
            ]
          }
        },
        {
          id: 'c',
          text: '无所谓啦，反正PRD也是AI写的，丢了就丢了吧，Vibe Coding嘛～',
          scores: {
            solo_dependency: 3,
            efficiency_priority: 3,
            risk_tolerance: 3,
            control_desire: 0.8
          },
          evidence: {
            supports: [
              { type: 'solo_evangelist', weight: 2.5 },
              { type: 'solo_evangelist', weight: 1.5 }
            ],
            conflicts: [
              { type: 'quality_pursuer', weight: 2 },
              { type: 'structured_planner', weight: 1.5 }
            ]
          }
        }
      ]
    },
    {
      id: 'q4',
      text: '开启Auto Model后，AI突然降智了——不听指挥、自言自语过度思考、agent功能全丢失，你会：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '关掉Auto Model！手动指定模型才是正道，免费的往往是最贵的（花点小钱省很多事）',
          scores: {
            control_desire: 2.5,
            prompt_mastery: 2.5,
            ai_supervision: 2.5,
            innovation_spirit: 1.5
          },
          evidence: {
            supports: [
              { type: 'prompt_artist', weight: 2 },
              { type: 'micro_manager', weight: 1.5 }
            ],
            conflicts: [{ type: 'solo_evangelist', weight: 1.5 }]
          }
        },
        {
          id: 'b',
          text: '分分钟被逼疯了……重启任务，这次老老实实手动选模型',
          scores: {
            solo_dependency: 2,
            efficiency_priority: 2,
            learning_adaptability: 2,
            risk_tolerance: 2
          },
          evidence: {
            supports: [
              { type: 'rapid_prototyper', weight: 1.5 },
              { type: 'rapid_prototyper', weight: 2 }
            ]
          }
        },
        {
          id: 'c',
          text: '这就是AI的"脑子时好时坏"，忍忍吧，说不定下一轮对话它又恢复正常了',
          scores: {
            solo_dependency: 2.8,
            efficiency_priority: 2.5,
            risk_tolerance: 2.8,
            control_desire: 1
          },
          evidence: {
            supports: [
              { type: 'solo_evangelist', weight: 2 },
              { type: 'innovation_explorer', weight: 1.5 }
            ],
            conflicts: [{ type: 'conservative_coder', weight: 2 }]
          }
        }
      ]
    },
    {
      id: 'q5',
      text: '同事问你"Trae和Cursor比到底咋样"，你的回答更像是：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '"Cursor是手打40%+补全60%，Trae是手打90%+补全10%——但Trae免费啊！"',
          scores: {
            solo_dependency: 2.5,
            efficiency_priority: 2,
            context_engineering: 1.5,
            innovation_spirit: 2
          },
          evidence: {
            supports: [
              { type: 'solo_evangelist', weight: 2 },
              { type: 'balanced_practitioner', weight: 1.5 }
            ]
          }
        },
        {
          id: 'b',
          text: '"Trae免费是真香，但开大项目会卡顿、内存占用高30%、偶尔弹字节系产品推荐烦死人"',
          scores: {
            context_engineering: 2.5,
            ai_supervision: 2,
            control_desire: 2,
            prompt_mastery: 1.8
          },
          evidence: {
            supports: [
              { type: 'context_master', weight: 2 },
              { type: 'balanced_practitioner', weight: 1.5 }
            ]
          }
        },
        {
          id: 'c',
          text: '"别问了，我能用就行——反正公司禁了所有第三方AI工具，只能用字节自家的"',
          scores: {
            solo_dependency: 2,
            control_desire: 2.5,
            ai_supervision: 2,
            innovation_spirit: 0.8
          },
          evidence: {
            supports: [
              { type: 'conservative_coder', weight: 1.5 },
              { type: 'conservative_coder', weight: 1.5 }
            ],
            conflicts: [{ type: 'innovation_explorer', weight: 2 }]
          }
        }
      ]
    },
    {
      id: 'q6',
      text: '用Trae Solo做了个AI漫剧平台，做到一半发现出了bug完全不知道怎么看日志，连夜换了技术栈（Python→Java+PostgreSQL），你会：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '这就是Vibe Coding的B面——快速构建产品爽，调试痛苦到想砸电脑',
          scores: {
            solo_dependency: 2.5,
            efficiency_priority: 2.5,
            risk_tolerance: 2.5,
            control_desire: 1
          },
          evidence: {
            supports: [
              { type: 'solo_evangelist', weight: 1.5 },
              { type: 'solo_evangelist', weight: 2 }
            ],
            conflicts: [{ type: 'quality_pursuer', weight: 2 }]
          }
        },
        {
          id: 'b',
          text: '吸取教训：开工前明确技术栈，千万不要中途换车；用熟不用生，这样AI犯错时你才能debug',
          scores: {
            task_decomposition: 3,
            ai_supervision: 2.5,
            control_desire: 2.5,
            learning_adaptability: 2.5
          },
          evidence: {
            supports: [
              { type: 'structured_planner', weight: 2 },
              { type: 'structured_planner', weight: 1.5 }
            ]
          }
        },
        {
          id: 'c',
          text: '从0开始吧……这次找个懂Java的朋友配合，纯靠AI做复杂项目还是不太行',
          scores: {
            solo_dependency: 1.5,
            context_engineering: 2.5,
            ai_supervision: 2.5,
            task_decomposition: 2
          },
          evidence: {
            supports: [
              { type: 'context_master', weight: 2 },
              { type: 'context_master', weight: 1.5 }
            ],
            conflicts: [{ type: 'solo_evangelist', weight: 1.5 }]
          }
        }
      ]
    },
    {
      id: 'q7',
      text: '老板让你用Trae SOLO的Plan模式先出方案再动手，你觉得：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '太好了！终于可以把AI的意图暴露出来让我先否决了，免得它一键生成一锅端',
          scores: {
            task_decomposition: 3,
            ai_supervision: 3,
            control_desire: 3,
            efficiency_priority: 1.2
          },
          evidence: {
            supports: [
              { type: 'micro_manager', weight: 2.5 },
              { type: 'structured_planner', weight: 1.5 }
            ],
            conflicts: [{ type: 'rapid_prototyper', weight: 2 }]
          }
        },
        {
          id: 'b',
          text: 'Plan模式是好，但AI出的方案经常是正确的废话——看着计划完美，执行起来全是坑',
          scores: {
            context_engineering: 2.5,
            ai_supervision: 2.5,
            prompt_mastery: 2,
            learning_adaptability: 2
          },
          evidence: {
            supports: [
              { type: 'context_master', weight: 2 },
              { type: 'quality_pursuer', weight: 1.5 }
            ]
          }
        },
        {
          id: 'c',
          text: '直接跳过Plan，让SOLO Builder一键生成——反正最后还是要我自己改，不如早点看到能跑的东西',
          scores: {
            solo_dependency: 3,
            efficiency_priority: 3,
            risk_tolerance: 2.8,
            task_decomposition: 0.8
          },
          evidence: {
            supports: [
              { type: 'solo_evangelist', weight: 2.5 },
              { type: 'rapid_prototyper', weight: 1.5 }
            ],
            conflicts: [
              { type: 'structured_planner', weight: 2 },
              { type: 'micro_manager', weight: 1.5 }
            ]
          }
        }
      ]
    },
    {
      id: 'q8',
      text: 'Trae推出新功能"Sub Agent多任务并行"，你可以同时跑前端、后端、测试三个Agent，你会：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '立马试用！把三个Agent全开起来，像包工头一样指挥它们干活，效率翻倍！',
          scores: {
            innovation_spirit: 3,
            solo_dependency: 3,
            efficiency_priority: 3,
            task_decomposition: 2.5
          },
          evidence: {
            supports: [
              { type: 'innovation_explorer', weight: 2.5 },
              { type: 'solo_evangelist', weight: 1.5 }
            ],
            conflicts: [{ type: 'conservative_coder', weight: 2 }]
          }
        },
        {
          id: 'b',
          text: '谨慎使用……官方文档说了要避免上下文污染，我还是一个一个来吧',
          scores: {
            task_decomposition: 2.5,
            ai_supervision: 2.5,
            control_desire: 2.5,
            context_engineering: 2
          },
          evidence: {
            supports: [
              { type: 'structured_planner', weight: 2 },
              { type: 'micro_manager', weight: 1.5 }
            ]
          }
        },
        {
          id: 'c',
          text: 'Sub Agent是什么？我只知道单线程开发就够了，多任务并行听着就头疼',
          scores: {
            solo_dependency: 1.2,
            control_desire: 2.8,
            ai_supervision: 2,
            learning_adaptability: 1
          },
          evidence: {
            supports: [
              { type: 'conservative_coder', weight: 2 },
              { type: 'conservative_coder', weight: 1.5 }
            ],
            conflicts: [{ type: 'innovation_explorer', weight: 2 }]
          }
        }
      ]
    },
    {
      id: 'q9',
      text: '深夜加班，Trae SOLO突然"修复了一个Bug，引入了两个新Bug"陷入死循环，你会：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '关掉AI自己手动修——这种时候相信AI就是给自己挖坑',
          scores: {
            control_desire: 3,
            ai_supervision: 3,
            solo_dependency: 0.8,
            task_decomposition: 2.5
          },
          evidence: {
            supports: [
              { type: 'conservative_coder', weight: 2.5 },
              { type: 'quality_pursuer', weight: 1.5 }
            ],
            conflicts: [{ type: 'solo_evangelist', weight: 2.5 }]
          }
        },
        {
          id: 'b',
          text: '让它继续修吧，说不定第10轮就能修好——反正我也看不懂它在干嘛',
          scores: {
            solo_dependency: 3,
            efficiency_priority: 2,
            risk_tolerance: 2.5,
            ai_supervision: 0.5
          },
          evidence: {
            supports: [
              { type: 'solo_evangelist', weight: 2 },
              { type: 'solo_evangelist', weight: 1.5 }
            ],
            conflicts: [{ type: 'quality_pursuer', weight: 2 }]
          }
        },
        {
          id: 'c',
          text: '先git commit保底，然后让AI接着改——实在不行就回滚，总比手动强',
          scores: {
            task_decomposition: 2.5,
            ai_supervision: 2,
            context_engineering: 2,
            risk_tolerance: 1.8
          },
          evidence: {
            supports: [
              { type: 'structured_planner', weight: 2 },
              { type: 'balanced_practitioner', weight: 1.5 }
            ]
          }
        }
      ]
    },
    {
      id: 'q10',
      text: 'Trae SOLO凭空捏造了一个不存在的库函数（幻觉），编译时报错才发现，你的反应是：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '我就知道！AI写的代码从来不检查import，这次又是哪个幻觉函数？',
          scores: {
            ai_supervision: 3,
            control_desire: 2.8,
            solo_dependency: 1,
            task_decomposition: 2.5
          },
          evidence: {
            supports: [
              { type: 'conservative_coder', weight: 2 },
              { type: 'quality_pursuer', weight: 1.5 }
            ],
            conflicts: [{ type: 'solo_evangelist', weight: 2 }]
          }
        },
        {
          id: 'b',
          text: '正常操作，告诉AI"这个库不存在，换个实现方式"，它应该能自我纠正',
          scores: {
            prompt_mastery: 2.5,
            context_engineering: 2,
            learning_adaptability: 2.5,
            ai_supervision: 2
          },
          evidence: {
            supports: [
              { type: 'prompt_artist', weight: 2 },
              { type: 'context_master', weight: 1.5 }
            ]
          }
        },
        {
          id: 'c',
          text: 'npm install一下试试？万一这个库真的存在只是我没装呢（虽然大概率是AI在胡扯）',
          scores: {
            solo_dependency: 2.5,
            efficiency_priority: 2.5,
            risk_tolerance: 2.8,
            control_desire: 1
          },
          evidence: {
            supports: [
              { type: 'solo_evangelist', weight: 1.5 },
              { type: 'innovation_explorer', weight: 1.8 }
            ],
            conflicts: [{ type: 'conservative_coder', weight: 2 }]
          }
        }
      ]
    },
    {
      id: 'q11',
      text: '使用Trae Solo三个月后，你觉得最大的变化是：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '写的代码量暴减，但交付的项目数量翻倍——我终于从码农变成产品经理了（虽然debug时想死）',
          scores: {
            solo_dependency: 3,
            efficiency_priority: 3,
            innovation_spirit: 2.2,
            task_decomposition: 2
          },
          evidence: {
            supports: [
              { type: 'solo_evangelist', weight: 2.5 },
              { type: 'solo_evangelist', weight: 1.5 }
            ]
          }
        },
        {
          id: 'b',
          text: 'Prompt写得越来越溜，以前半天搞不定的事现在几句话就能描述清楚——但AI降智时还是会暴走',
          scores: {
            prompt_mastery: 3,
            learning_adaptability: 3,
            context_engineering: 2.2,
            task_decomposition: 2
          },
          evidence: {
            supports: [
              { type: 'prompt_artist', weight: 2.5 },
              { type: 'prompt_artist', weight: 1.5 }
            ]
          }
        },
        {
          id: 'c',
          text: '审查AI生成代码的速度变快了，一眼就能看出典型问题——毕竟被坑太多次练出来了',
          scores: {
            ai_supervision: 3,
            control_desire: 2.2,
            learning_adaptability: 2.2,
            risk_tolerance: 1
          },
          evidence: {
            supports: [
              { type: 'micro_manager', weight: 2.5 },
              { type: 'micro_manager', weight: 1.5 }
            ]
          }
        }
      ]
    },
    {
      id: 'q12',
      text: '如果明天Trae宣布收费且取消免费模式，你会：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '咬咬牙也要续费，已经离不开了——回到手写代码的时代太痛苦（而且排队的问题应该能解决吧？）',
          scores: {
            solo_dependency: 3,
            innovation_spirit: 2,
            learning_adaptability: 2,
            efficiency_priority: 2
          },
          evidence: {
            supports: [
              { type: 'solo_evangelist', weight: 2.5 },
              { type: 'solo_evangelist', weight: 1.5 }
            ]
          }
        },
        {
          id: 'b',
          text: '评估性价比，如果确实值就付费——不然就回Cursor或Claude Code，反正AI编程工具多得是',
          scores: {
            task_decomposition: 2,
            ai_supervision: 2,
            context_engineering: 2.5,
            control_desire: 2
          },
          evidence: {
            supports: [
              { type: 'balanced_practitioner', weight: 2 },
              { type: 'balanced_practitioner', weight: 1.5 }
            ]
          }
        },
        {
          id: 'c',
          text: '正好借机回归传统开发——AI辅助可以用但不想被绑定死，况且Cursor的Composer确实香',
          scores: {
            solo_dependency: 0.7,
            control_desire: 3,
            ai_supervision: 2.2,
            innovation_spirit: 1.5
          },
          evidence: {
            supports: [
              { type: 'conservative_coder', weight: 2.5 },
              { type: 'conservative_coder', weight: 1.5 }
            ],
            conflicts: [{ type: 'solo_evangelist', weight: 2.5 }]
          }
        }
      ]
    }
  ],
  personalityTypes: [
    {
      id: 'solo_evangelist',
      name: '全托付信徒',
      description: '"Trae Solo就是我亲爹。"恭喜您，您测出了这个把AI当神供着的极端人格。别人还在纠结要不要让AI写注释，您已经把整个项目的PRD到部署全交给SOLO模式了——包括您的银行卡密码（如果AI问的话）。嘴上说着"效率提升10倍"，心里想的却是"终于不用再当码农了"。您就像一个刚入教的狂热信徒，逢人就安利Trae Solo的好，仿佛不用这个工具的人都是原始人。排队2000+？没事我等！卡死2小时？重启浏览器继续！999元优速通？咬咬牙充了！说实话，您大概已经忘记上次亲手敲一行生产代码是什么时候了。别担心，那不是退步，那是进化——进化成一个只会按回车键的废物。',
      meme: 'AI写代码，我喝咖啡',
      template: {
        solo_dependency: 3.0,
        prompt_mastery: 1.2,
        task_decomposition: 1.0,
        ai_supervision: 1.0,
        control_desire: 0.8,
        innovation_spirit: 2.8,
        efficiency_priority: 3.0,
        context_engineering: 1.5,
        risk_tolerance: 2.8,
        learning_adaptability: 2.6
      },
      constraints: [
        { dimension: 'solo_dependency', min: 2.7, hard: true },
        { dimension: 'efficiency_priority', min: 2.7, hard: true },
        { dimension: 'control_desire', max: 1.4, weight: 1.2 }
      ]
    },
    {
      id: 'prompt_artist',
      name: '咒语大师',
      description: '"Prompt就是新时代的代码，而我就是那个巫师。"恭喜您，您测出了这个把指令编写当成黑魔法修炼的人格。别人随口一句"帮我写个登录功能"，您能写出包含技术栈、异常处理、性能要求、测试覆盖率、甚至emoji表情的完美Prompt——而且每个标点符号都经过深思熟虑。您深知AI的输出质量90%取决于输入质量，所以您宁愿花20分钟打磨一句话也不愿意花2小时去改AI生成的垃圾代码。嘴上说着"提示词工程是核心竞争力"，手上却默默收藏了上百个高质量Prompt模板（还按场景分了类）。您就像一个人形编译器——输入的是模糊需求，输出的是精确到标点符号的咒语。说实话，您的Prompt大概比您的代码还要优雅——可惜AI经常听不懂你的咒语然后给你整出点幻觉来。',
      meme: '一句话值千金',
      template: {
        solo_dependency: 2.0,
        prompt_mastery: 3.0,
        task_decomposition: 2.5,
        ai_supervision: 2.2,
        control_desire: 2.0,
        innovation_spirit: 2.0,
        efficiency_priority: 1.8,
        context_engineering: 2.3,
        risk_tolerance: 1.6,
        learning_adaptability: 2.4
      },
      constraints: [
        { dimension: 'prompt_mastery', min: 2.7, hard: true },
        { dimension: 'task_decomposition', min: 2.2, weight: 1.1 }
      ]
    },
    {
      id: 'micro_manager',
      name: '每行必查党',
      description: '"AI生成的每一行代码我都要审，一个标点都不能放过。"恭喜您，您测出了这个对AI输出有着近乎强迫症般审视人格。您不相信"能跑就行"，在您的世界里，代码必须经过您的眼睛才能算数——而且要放大200%逐字检查。别人用SOLO模式是为了省事，您用它只是为了有个免费的高级实习生给您打杂——而且这个实习生还得随时接受您的微操指导（"这里空一行"、"那个变量名改成驼峰"、"这个注释格式不对"）。嘴上说着"质量控制很重要"，手上却已经在第18次要求AI重写同一个函数了（因为您觉得它不够优雅）。您就像一个人形静态分析器+代码格式化工具——插进去的是AI的自信，吐出来的是"这里不行那里也不行"。说实话，AI大概觉得您比它的训练数据还难伺候——甚至想给您写个专门的适配层。',
      meme: 'AI写的？我不信',
      template: {
        solo_dependency: 1.4,
        prompt_mastery: 2.0,
        task_decomposition: 2.2,
        ai_supervision: 3.0,
        control_desire: 3.0,
        innovation_spirit: 1.2,
        efficiency_priority: 1.0,
        context_engineering: 1.8,
        risk_tolerance: 0.7,
        learning_adaptability: 1.6
      },
      constraints: [
        { dimension: 'ai_supervision', min: 2.7, hard: true },
        { dimension: 'control_desire', min: 2.7, hard: true },
        { dimension: 'efficiency_priority', max: 1.5, weight: 1.2 }
      ]
    },
    {
      id: 'rapid_prototyper',
      name: 'MVP狂魔',
      description: '"先跑起来再说！完美是优等生的借口，上线才是王道。"恭喜您，您测出了这个追求极致交付速度的狂魔人格。您的信条很简单：完美的计划不如粗糙的原型，能用的代码胜过精美的设计，能上线的功能比什么都强。别人还在写PRD文档的时候，您已经用SOLO Builder生成了三个可运行的Demo（虽然每个都有点小问题）。嘴上说着"MVP思维"，心里想的却是"老板明天就要看效果——哪怕是个半成品也行"。您就像一台永动机——输入的是模糊需求（甚至有时候就是"做个XX"三个字），输出的是一坨能跑但可能明天就要重构的代码。别怕，那不是技术债，那是速度的红利！反正重构也是AI的事。说实话，您大概是整个团队里交付最快但也最常被叫去"优化"的那个人——不过您根本不在乎，因为下一个项目已经在路上了。',
      meme: '能上线就是胜利',
      template: {
        solo_dependency: 2.9,
        prompt_mastery: 1.3,
        task_decomposition: 1.1,
        ai_supervision: 1.1,
        control_desire: 0.9,
        innovation_spirit: 2.6,
        efficiency_priority: 3.0,
        context_engineering: 1.5,
        risk_tolerance: 2.9,
        learning_adaptability: 2.2
      },
      constraints: [
        { dimension: 'efficiency_priority', min: 2.7, hard: true },
        { dimension: 'risk_tolerance', min: 2.6, hard: true },
        { dimension: 'control_desire', max: 1.5, weight: 1.1 },
        { dimension: 'solo_dependency', min: 2.5, weight: 1.1 }
      ]
    },
    {
      id: 'context_master',
      name: '情报收集癖',
      description: '"没有上下文的AI就是个瞎子——所以我得给它装上雷达。"恭喜您，您测出了这个对信息收集有着病态执着的人格。别人只知道在对话框里打字，您却懂得引用代码仓库、上传PDF文档、粘贴网页链接、标注设计稿、附带数据库Schema、甚至把之前的聊天记录都喂给AI——把所有相关信息编织成一个密不透风的上下文网络。您深知AI不是万能的（经常降智、幻觉、死循环），但没有足够上下文的AI连及格都做不到。嘴上说的是"上下文工程"，实际上您已经成为了一个人形知识图谱构建器+情报分析师+资料整理狂魔。您就像一个准备期末考试的学霸——收集散落各处的碎片信息，拼凑出完整的真相再交给AI执行。说实话，您的.trae目录里的引用文件大概比您的src目录还多——而且每个文件都有详细的注释说明"为什么要引用这个"。',
      meme: '给我足够的信息',
      template: {
        solo_dependency: 1.9,
        prompt_mastery: 2.6,
        task_decomposition: 2.8,
        ai_supervision: 2.2,
        control_desire: 1.6,
        innovation_spirit: 2.0,
        efficiency_priority: 1.6,
        context_engineering: 3.0,
        risk_tolerance: 1.5,
        learning_adaptability: 2.6
      },
      constraints: [
        { dimension: 'context_engineering', min: 2.8, hard: true },
        { dimension: 'task_decomposition', min: 2.6, weight: 1.1 },
        { dimension: 'efficiency_priority', max: 1.9, weight: 1.2 }
      ]
    },
    {
      id: 'conservative_coder',
      name: '手动挡老司机',
      description: '"AI？辅助工具而已，别太当真——核心链路必须我自己写。"恭喜您，您测出了这个对AI保持理性克制（甚至有点鄙视）的人格。您不反对使用Trae Solo，但您清楚地知道它的能力边界在哪里——而且那个边界离您很远。核心业务逻辑？坚持手写。复杂算法？自己实现。数据库操作？手写SQL。只有那些重复性、无脑的活儿（生成CRUD、写测试用例、格式化代码）才勉强交给AI凑合一下。嘴上说着"不能把鸡蛋放在一个篮子里"，手上却在关键时刻毫不犹豫地切换回IDE模式手动编码——因为您知道AI生成的代码迟早会出问题（幻觉、降智、死循环，它什么干不出来）。您就像一个开了20年手动挡的老司机——虽然周围人都在开自动挡（AI），但您坚信手动才最靠谱、最有掌控感。说实话，您可能是整个团队里最不容易被AI替代的那个人——因为您从未真正信任过它。',
      meme: '核心链路我自己来',
      template: {
        solo_dependency: 0.9,
        prompt_mastery: 1.4,
        task_decomposition: 1.7,
        ai_supervision: 2.4,
        control_desire: 2.8,
        innovation_spirit: 0.8,
        efficiency_priority: 1.1,
        context_engineering: 1.4,
        risk_tolerance: 0.6,
        learning_adaptability: 1.2
      },
      constraints: [
        { dimension: 'solo_dependency', max: 1.3, weight: 1.5 },
        { dimension: 'control_desire', min: 2.5, weight: 1.3 },
        { dimension: 'risk_tolerance', max: 1.0, weight: 1.4 },
        { dimension: 'innovation_spirit', max: 1.3, weight: 1.2 },
        { dimension: 'efficiency_priority', max: 1.5, weight: 1.2 }
      ]
    },
    {
      id: 'innovation_explorer',
      name: '小白鼠',
      description: '"新功能出了？我是第一个试的！哪怕它会炸。"恭喜您，您测出了这个对新技术有着无限好奇心（和作死精神）的人格。Trae Solo每次更新您都是第一批体验的用户——甚至有时候在官方还没发布的时候您就已经在用beta版了。新出的Agent生态？马上试试！多智能体并行？必须玩！自定义Skill？我来写！Sub Agent？全部开起来！别人还在犹豫要不要升级，您已经开始写使用心得分享给社区了（虽然经常是"这个功能有点坑"）。嘴上写着"拥抱变化"，实际上您只是单纯地享受探索未知的快感——以及当小白鼠的刺激感。您就像一个永远长不大的孩子——看到新玩具就走不动路，哪怕那个玩具可能会爆炸（而且经常真的会爆炸）。说实话，您的Trae配置文件大概比官方文档更新得还频繁——而且您的bug反馈量可能占官方社区的30%。',
      meme: '新功能？我先替你们踩坑',
      template: {
        solo_dependency: 2.3,
        prompt_mastery: 1.9,
        task_decomposition: 1.6,
        ai_supervision: 1.4,
        control_desire: 1.2,
        innovation_spirit: 3.0,
        efficiency_priority: 2.4,
        context_engineering: 1.8,
        risk_tolerance: 2.4,
        learning_adaptability: 3.0
      },
      constraints: [
        { dimension: 'innovation_spirit', min: 2.7, hard: true },
        { dimension: 'learning_adaptability', min: 2.7, hard: true },
        { dimension: 'control_desire', max: 1.6, weight: 1.1 },
        { dimension: 'solo_dependency', max: 2.6, weight: 1.2 }
      ]
    },
    {
      id: 'structured_planner',
      name: 'PPT架构师',
      description: '"没有Plan的开发就是在裸奔——而我从不裸奔。"恭喜您，您测出了这个对计划和结构有着病态执念的人格。无论任务大小（哪怕是写一个Hello World），您都要先开启Plan模式让AI输出详细方案，然后逐条审核修改，确认无误后才允许执行。您不是拖延症（虽然别人都这么认为），您只是坚信"磨刀不误砍柴工"——哪怕磨刀花了3天、砍柴只用了10分钟。别人觉得您慢，但您交付的东西从来没有返工过（因为您根本没时间交付）。嘴上说着"三思而后行"，手上却已经把一个简单的登录功能拆解成了包含需求分析、技术选型、实现步骤、测试策略、风险评估、性能优化、安全审查的七阶段计划——还附带了甘特图。您就像一个项目经理附体的程序员——还没开始写代码，PPT都已经做了50页。说实话，您的Plan模式使用时长大概比实际编码时间还长——但您坚信这是值得的（即使老板已经催了800遍）。',
      meme: '先写方案再动手',
      template: {
        solo_dependency: 1.9,
        prompt_mastery: 2.4,
        task_decomposition: 3.0,
        ai_supervision: 2.6,
        control_desire: 2.4,
        innovation_spirit: 1.6,
        efficiency_priority: 1.4,
        context_engineering: 2.4,
        risk_tolerance: 1.4,
        learning_adaptability: 2.0
      },
      constraints: [
        { dimension: 'task_decomposition', min: 2.8, hard: true },
        { dimension: 'ai_supervision', min: 2.4, weight: 1.2 },
        { dimension: 'efficiency_priority', max: 1.7, weight: 1.2 },
        { dimension: 'control_desire', min: 2.2, weight: 1.3 },
        { dimension: 'prompt_mastery', min: 2.2, weight: 1.2 }
      ]
    },
    {
      id: 'quality_pursuer',
      name: '洁癖质检员',
      description: '"代码可以AI生成，但标准不能降——一个分号都不能少。"恭喜您，您测出了这个对代码质量有着近乎病态追求的人格。您用Trae Solo不是为了偷懒（那太low了），而是为了让AI帮您达到更高的质量标准——更好的架构、更完善的测试（覆盖率必须80%+）、更清晰的文档（每个函数都要有JSDoc）、更规范的格式（ESLint规则全部开启error级别）。别人满足于"能跑就行"，您却在用AI生成代码的同时要求它遵循SOLID原则、设计模式、Clean Code规范——甚至让它重构自己的输出直到符合您的审美。嘴上说着"工匠精神"，实际上您只是无法容忍任何形式的将就和妥协——哪怕AI已经改了5版了您还是觉得不够优雅。您就像一个带放大镜的质检员+代码美学评论家——AI产出的每一行代码都要经过您的严格检验（甚至包括空行数量和缩进风格）。说实话，您的code review意见大概比AI生成的代码本身还要长——而且您经常因为一个变量命名问题跟AI争论半小时。',
      meme: '质量是信仰',
      template: {
        solo_dependency: 1.5,
        prompt_mastery: 2.6,
        task_decomposition: 2.4,
        ai_supervision: 2.8,
        control_desire: 2.5,
        innovation_spirit: 1.5,
        efficiency_priority: 1.0,
        context_engineering: 2.3,
        risk_tolerance: 0.9,
        learning_adaptability: 1.9
      },
      constraints: [
        { dimension: 'ai_supervision', min: 2.6, hard: true },
        { dimension: 'prompt_mastery', min: 2.4, weight: 1.2 },
        { dimension: 'risk_tolerance', max: 1.3, weight: 1.1 },
        { dimension: 'efficiency_priority', max: 1.4, weight: 1.2 }
      ]
    },
    {
      id: 'balanced_practitioner',
      name: '老油条',
      description: '"工具是为人服务的，不是反过来——所以我该用就用，该手动就手动。"恭喜您，您测出了这个最成熟（或者说最圆滑）的Trae Solo用户人格。您既不完全依赖AI（因为你知道它会降智），也不盲目排斥它（因为免费的不用白不用）；既追求效率（老板要结果），也注重质量（毕竟背锅的是你）；既善于利用新功能（能省事就省事），也懂得坚守基本原则（核心逻辑还是自己写）。您像一个在职场摸爬滚打多年的老油条——知道什么时候该让SOLO模式冲锋陷阵（简单CRUD、原型验证），什么时候该亲自上阵把关关键节点（支付逻辑、数据安全）。嘴上不说大话（"AI也就那样吧"），但您的项目总是按时交付且质量过硬（虽然偶尔也会翻车）。您不需要向任何人证明什么，因为结果已经说明了一切。说实话，您可能是最让老板放心、让同事舒服、让自己满意的那个人——虽然您永远不会成为任何一个极端阵营的代言人（因为站队太累而且容易被打脸）。',
      meme: '中庸之道保平安',
      template: {
        solo_dependency: 2.3,
        prompt_mastery: 2.0,
        task_decomposition: 2.0,
        ai_supervision: 2.0,
        control_desire: 1.8,
        innovation_spirit: 1.6,
        efficiency_priority: 2.4,
        context_engineering: 1.9,
        risk_tolerance: 2.0,
        learning_adaptability: 2.0
      },
      constraints: [
        { dimension: 'efficiency_priority', min: 2.4, max: 2.4, weight: 3.5 },
        { dimension: 'control_desire', min: 1.7, max: 1.8, weight: 3.0 },
        { dimension: 'innovation_spirit', max: 1.55, weight: 2.8 },
        { dimension: 'solo_dependency', min: 2.29, max: 2.31, weight: 3.0 },
        { dimension: 'ai_supervision', min: 2.0, max: 2.05, weight: 2.5 }
      ]
    }
  ],
  dimensionWeights: {
    solo_dependency: 1.15,
    prompt_mastery: 1.2,
    task_decomposition: 1.15,
    ai_supervision: 1.2,
    control_desire: 1.1,
    innovation_spirit: 1.05,
    efficiency_priority: 1.15,
    context_engineering: 1.2,
    risk_tolerance: 1.1,
    learning_adaptability: 1.1
  },
  acceptanceCases: [
    {
      id: 'case-solo-evangelist',
      label: '极致依赖AI的全自动开发者',
      expectedType: 'solo_evangelist',
      answers: { q1: 'b', q2: 'b', q3: 'c', q4: 'c', q5: 'a', q6: 'a', q7: 'c', q8: 'a', q9: 'b', q10: 'c', q11: 'a', q12: 'a' }
    },
    {
      id: 'case-prompt-artist',
      label: '精心雕琢指令的Prompt工程师',
      expectedType: 'prompt_artist',
      answers: { q1: 'b', q2: 'c', q3: 'b', q4: 'a', q5: 'b', q6: 'b', q7: 'b', q8: 'b', q9: 'c', q10: 'b', q11: 'b', q12: 'b' }
    },
    {
      id: 'case-micro-manager',
      label: '逐行审查的严格把控者',
      expectedType: 'micro_manager',
      answers: { q1: 'a', q2: 'a', q3: 'a', q4: 'a', q5: 'c', q6: 'b', q7: 'a', q8: 'b', q9: 'a', q10: 'a', q11: 'c', q12: 'c' }
    },
    {
      id: 'case-rapid-prototyper',
      label: '追求速度的MVP达人',
      expectedType: 'rapid_prototyper',
      answers: { q1: 'b', q2: 'b', q3: 'c', q4: 'b', q5: 'a', q6: 'a', q7: 'c', q8: 'a', q9: 'b', q10: 'c', q11: 'a', q12: 'a' }
    },
    {
      id: 'case-context-master',
      label: '善用多模态上下文的情报专家',
      expectedType: 'context_master',
      answers: { q1: 'c', q2: 'c', q3: 'b', q4: 'b', q5: 'b', q6: 'c', q7: 'b', q8: 'b', q9: 'c', q10: 'b', q11: 'b', q12: 'b' }
    },
    {
      id: 'case-conservative-coder',
      label: '保持克制的传统开发者',
      expectedType: 'conservative_coder',
      answers: { q1: 'a', q2: 'c', q3: 'a', q4: 'b', q5: 'c', q6: 'b', q7: 'c', q8: 'c', q9: 'b', q10: 'a', q11: 'c', q12: 'c' }
    },
    {
      id: 'case-innovation-explorer',
      label: '热衷尝鲜的技术极客',
      expectedType: 'innovation_explorer',
      answers: { q1: 'b', q2: 'c', q3: 'b', q4: 'b', q5: 'a', q6: 'b', q7: 'b', q8: 'a', q9: 'c', q10: 'b', q11: 'a', q12: 'a' }
    },
    {
      id: 'case-structured-planner',
      label: '先规划后执行的方法论信徒',
      expectedType: 'structured_planner',
      answers: { q1: 'c', q2: 'c', q3: 'b', q4: 'b', q5: 'b', q6: 'b', q7: 'a', q8: 'b', q9: 'c', q10: 'b', q11: 'b', q12: 'b' }
    },
    {
      id: 'case-quality-pursuer',
      label: '坚守标准的完美主义者',
      expectedType: 'quality_pursuer',
      answers: { q1: 'b', q2: 'b', q3: 'b', q4: 'a', q5: 'b', q6: 'c', q7: 'a', q8: 'b', q9: 'a', q10: 'a', q11: 'c', q12: 'b' }
    },
    {
      id: 'case-balanced-practitioner',
      label: '理性平衡的中庸之道践行者',
      expectedType: 'balanced_practitioner',
      answers: { q1: 'b', q2: 'b', q3: 'a', q4: 'b', q5: 'a', q6: 'a', q7: 'a', q8: 'a', q9: 'c', q10: 'b', q11: 'a', q12: 'b' }
    }
  ]
};

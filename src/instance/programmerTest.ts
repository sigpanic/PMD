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
      description: '指挥AI Agent协同工作的能力',
      min_label: '手动执行者',
      max_label: '智能体指挥官'
    },
    {
      id: 'skill_distillation',
      name: '技能蒸馏能力',
      description: '将专业知识封装成可复用Skill的能力',
      min_label: '技能独享者',
      max_label: '技能蒸馏师'
    },
    {
      id: 'vibe_coding',
      name: 'Vibe Coding能力',
      description: '靠感觉和直觉驾驭AI的能力',
      min_label: '逻辑编程者',
      max_label: 'Vibe Coding大师'
    },
    {
      id: 'ai_supervision',
      name: 'AI监督能力',
      description: '审查和监督AI工作的能力',
      min_label: '代码执行者',
      max_label: '高价值监督者'
    },
    {
      id: 'frontend_resilience',
      name: '前端韧性',
      description: '在"前端已死"言论中的心理韧性',
      min_label: '焦虑不安',
      max_label: '岿然不动'
    },
    {
      id: 'cross_domain',
      name: '跨域能力',
      description: '借助AI快速切换不同技术领域的能力',
      min_label: '领域专家',
      max_label: '全栈瑞士军刀'
    },
    {
      id: 'bug_hunting',
      name: 'Bug hunting能力',
      description: '排查和解决难以复现Bug的能力',
      min_label: 'Bug畏惧者',
      max_label: '量子态Bug猎人'
    },
    {
      id: 'ai_cleanup',
      name: 'AI擦屁股能力',
      description: '修复AI生成代码问题的能力',
      min_label: 'AI依赖者',
      max_label: 'AI擦屁股工程师'
    },
    {
      id: 'colleague_skill',
      name: '同事.skill特质',
      description: '是否容易被公司蒸馏成AI Skill然后被辞退',
      min_label: '安全的打工人',
      max_label: '同事.skill'
    },
    {
      id: 'llm_research',
      name: 'LLM研发能力',
      description: '大模型研发相关的知识和能力',
      min_label: '门外汉',
      max_label: 'LLM专家'
    },
    {
      id: 'innovation',
      name: '创新精神',
      description: '对新技术的接受和探索程度',
      min_label: '保守派',
      max_label: '弄潮儿'
    },
    {
      id: 'adaptability',
      name: '适应能力',
      description: '适应变化的能力',
      min_label: '固执己见',
      max_label: '随机应变'
    },
    {
      id: 'ethics',
      name: '道德底线',
      description: '在技术选择中的道德考量',
      min_label: '为达目的不择手段',
      max_label: '有原则有底线'
    }
  ],
  questions: [
    {
      id: 'q1',
      text: 'LLM训练中，以下哪种方法通常用于解决模型的灾难性遗忘问题？',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '持续学习 (Continual Learning)',
          scores: {
            llm_research: 3,
            innovation: 3,
            skill_distillation: 1,
            ai_dependency: 1
          }
        },
        {
          id: 'b',
          text: '批量归一化 (Batch Normalization)',
          scores: {
            llm_research: 1,
            innovation: 1,
            ai_dependency: 1
          }
        },
        {
          id: 'c',
          text: '老子不懂，这是什么玩意',
          scores: {
            llm_research: 0,
            innovation: 0,
            ai_dependency: 1,
            frontend_resilience: 1
          }
        }
      ]
    },
    {
      id: 'q2',
      text: '早上打开GitHub，发现同事提交了1000行AI生成的代码，你的第一反应是：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: 'F**k，这货又让AI替他干活，我要给他的PR写满红色批注',
          scores: {
            ai_cleanup: 3,
            bug_hunting: 3,
            ai_supervision: 3,
            frontend_resilience: 2,
            anti_distillation: 2
          }
        },
        {
          id: 'b',
          text: '牛批，我也去让AI帮我写代码，摸鱼不香吗',
          scores: {
            ai_dependency: 3,
            vibe_coding: 3,
            ai_cleanup: 1,
            bug_hunting: 1
          }
        },
        {
          id: 'c',
          text: '让我研究一下他的prompt，偷学一手',
          scores: {
            skill_distillation: 3,
            agent_orchestration: 2,
            innovation: 3,
            ai_dependency: 2
          }
        }
      ]
    },
    {
      id: 'q3',
      text: '老板说："我们要All in AI，以后代码都让AI写"，你心里想：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '完了，我要失业了，明天就去投简历',
          scores: {
            colleague_skill: 3,
            frontend_resilience: 1,
            ai_dependency: 1,
            adaptability: 1
          }
        },
        {
          id: 'b',
          text: '太好了，以后我就是AI的项目经理，躺着赚钱',
          scores: {
            agent_orchestration: 2,
            ai_supervision: 2,
            adaptability: 2,
            innovation: 2
          }
        },
        {
          id: 'c',
          text: '切，AI写的代码全是bug，还得老子擦屁股',
          scores: {
            ai_cleanup: 3,
            bug_hunting: 3,
            frontend_resilience: 3,
            ai_dependency: 1
          }
        }
      ]
    },
    {
      id: 'q4',
      text: '看到群里又在发"前端已死，AI接管一切"，你会：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '吓得赶紧打开招聘网站，看看后端岗位',
          scores: {
            frontend_resilience: 1,
            colleague_skill: 3,
            cross_domain: 2,
            adaptability: 1
          }
        },
        {
          id: 'b',
          text: '冷笑一声，CSS布局AI能搞定？IE兼容性它懂个屁',
          scores: {
            frontend_resilience: 3,
            ai_cleanup: 3,
            bug_hunting: 3,
            ai_supervision: 2
          }
        },
        {
          id: 'c',
          text: 'AI写前端？那我去搞AI训练，砸了他们的饭碗',
          scores: {
            llm_research: 2,
            innovation: 3,
            cross_domain: 3,
            adaptability: 3
          }
        }
      ]
    },
    {
      id: 'q5',
      text: '同事被优化了，HR说："他的工作已经被AI取代"，你心里想：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '下一个就是我，我要把核心技能藏好',
          scores: {
            colleague_skill: 3,
            frontend_resilience: 1,
            ai_dependency: 1,
            skill_distillation: 1
          }
        },
        {
          id: 'b',
          text: '太好了，少了个卷王，我的工作量终于能少点',
          scores: {
            ai_dependency: 2,
            adaptability: 2,
            frontend_resilience: 2,
            colleague_skill: 1
          }
        },
        {
          id: 'c',
          text: '让我看看AI是怎么干他的活的，偷学一下',
          scores: {
            skill_distillation: 3,
            ai_dependency: 3,
            innovation: 3,
            adaptability: 3
          }
        }
      ]
    },
    {
      id: 'q6',
      text: 'AI生成的代码跑是能跑，但性能比屎还慢，你会：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '能跑就行，性能问题留给下一任',
          scores: {
            ai_dependency: 3,
            ai_cleanup: 1,
            ai_supervision: 1,
            vibe_coding: 3
          }
        },
        {
          id: 'b',
          text: '老子亲手重写，AI懂个屁的算法优化',
          scores: {
            ai_cleanup: 3,
            ai_supervision: 3,
            bug_hunting: 3,
            frontend_resilience: 2,
            quantum_bug_hunter: 2,
            ancient_programmer: 2
          }
        },
        {
          id: 'c',
          text: '让另一个AI来优化这个AI的代码',
          scores: {
            agent_orchestration: 2,
            ai_dependency: 2,
            vibe_coding: 2,
            innovation: 2
          }
        }
      ]
    },
    {
      id: 'q7',
      text: '老板让你做个项目，要求"用最新的AI技术"，你会：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '直接调用GPT API，能跑就行',
          scores: {
            ai_dependency: 3,
            vibe_coding: 3,
            innovation: 1,
            ai_supervision: 1
          }
        },
        {
          id: 'b',
          text: '搭建本地LLM，微调个专属模型',
          scores: {
            llm_research: 3,
            innovation: 3,
            skill_distillation: 2,
            ai_supervision: 3
          }
        },
        {
          id: 'c',
          text: 'AI？那是玩具，我用传统方法写',
          scores: {
            ai_dependency: 1,
            frontend_resilience: 3,
            bug_hunting: 3,
            ai_cleanup: 3
          }
        }
      ]
    },
    {
      id: 'q8',
      text: '看到搞LLM研发的同事拿了百万年薪，你心里想：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '码奸！就是你们砸了我们的饭碗',
          scores: {
            frontend_resilience: 1,
            colleague_skill: 3,
            innovation: 1
          }
        },
        {
          id: 'b',
          text: '大佬，带带我，我也想搞LLM',
          scores: {
            llm_research: 2,
            cross_domain: 2,
            adaptability: 3,
            innovation: 3
          }
        },
        {
          id: 'c',
          text: '有什么了不起，我用你的模型搞应用，赚的比你多',
          scores: {
            agent_orchestration: 2,
            skill_distillation: 2,
            ai_dependency: 2,
            innovation: 2
          }
        }
      ]
    },
    {
      id: 'q9',
      text: '公司让你把自己的工作流程写成文档，你会：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '写一堆废话，核心技巧一个字不提',
          scores: {
            skill_distillation: 1,
            colleague_skill: 3,
            frontend_resilience: 3,
            ai_dependency: 1
          }
        },
        {
          id: 'b',
          text: '认真写，希望能帮助新人',
          scores: {
            skill_distillation: 2,
            ai_supervision: 2,
            bug_hunting: 2,
            colleague_skill: 2
          }
        },
        {
          id: 'c',
          text: '直接做成Skill，让AI替我工作',
          scores: {
            skill_distillation: 3,
            agent_orchestration: 2,
            ai_dependency: 2,
            innovation: 2
          }
        }
      ]
    },
    {
      id: 'q10',
      text: '深夜加班，你发现AI生成的代码有个致命bug，你会：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '大骂AI是垃圾，然后自己修复',
          scores: {
            ai_cleanup: 3,
            bug_hunting: 3,
            ai_supervision: 3,
            frontend_resilience: 2
          }
        },
        {
          id: 'b',
          text: '让AI自己修复，我去摸鱼',
          scores: {
            ai_dependency: 3,
            vibe_coding: 3,
            agent_orchestration: 2,
            adaptability: 2
          }
        },
        {
          id: 'c',
          text: '记录下来，明天让同事修',
          scores: {
            colleague_skill: 2,
            adaptability: 1,
            ai_dependency: 1,
            frontend_resilience: 1
          }
        }
      ]
    },
    {
      id: 'q11',
      text: '梦见自己被AI取代，你惊醒后：',
      type: 'multiple_choice',
      options: [
        {
          id: 'a',
          text: '立刻打开电脑，学习LLM技术',
          scores: {
            llm_research: 3,
            innovation: 3,
            adaptability: 3,
            frontend_resilience: 2
          }
        },
        {
          id: 'b',
          text: '安慰自己，AI懂个屁的业务逻辑',
          scores: {
            frontend_resilience: 3,
            ai_cleanup: 3,
            bug_hunting: 3,
            ai_supervision: 2
          }
        },
        {
          id: 'c',
          text: '把简历更新一下，准备跳槽',
          scores: {
            colleague_skill: 3,
            adaptability: 2,
            innovation: 1,
            ai_dependency: 1
          }
        }
      ]
    }
  ],
  personalityTypes: [
    {
      id: 'dead_frontend',
      name: '已死的前端兄弟',
      description: '你是一个被AI浪潮淘汰的程序员。曾经引以为傲的HTML/CSS/JS技能，现在AI几秒钟就能生成。你拒绝学习AI工具，坚持传统开发方式，结果效率被AI用户甩开几条街。你看着同事们用AI提升10倍效率，自己却还在手动写代码。你不是前端真的死了，而是你还在用昨天的方式解决今天的问题。',
      meme: '我不需要AI，我只要jQuery',
      template: {
        ai_dependency: 1.0,
        agent_orchestration: 1.0,
        skill_distillation: 1.0,
        vibe_coding: 1.0,
        ai_supervision: 1.0,
        frontend_resilience: 1.0,
        cross_domain: 1.0,
        bug_hunting: 2.0,
        ai_cleanup: 1.0,
        colleague_skill: 2.0,
        llm_research: 1.0,
        innovation: 1.0,
        adaptability: 1.0,
        ethics: 2.0
      }
    },
    {
      id: 'code_traitor',
      name: '码奸',
      description: '你是一个研发大模型的核心人员，专注于大模型本身的研发，不是用大模型写代码的应用层码农。你的工作直接推动了AI技术的发展，但也导致了很多同行失业。你被其他程序员骂为"码奸"，但你知道技术进步是不可阻挡的。你相信大模型最终会创造更多新的工作机会，而不是消灭所有程序员。你在压力和争议中坚持前行，希望能为技术发展做出贡献。',
      meme: '我是码奸，我骄傲',
      template: {
        ai_dependency: 1.0,
        agent_orchestration: 1.0,
        skill_distillation: 1.0,
        vibe_coding: 1.0,
        ai_supervision: 1.0,
        frontend_resilience: 1.0,
        cross_domain: 1.5,
        bug_hunting: 1.5,
        ai_cleanup: 1.0,
        colleague_skill: 1.0,
        llm_research: 3.0,
        innovation: 3.0,
        adaptability: 3.0,
        ethics: 1.0
      }
    },
    {
      id: 'skill_distiller',
      name: '技能蒸馏师',
      description: '你是一个技能蒸馏师，擅长将自己的专业知识封装成可复用的Skill。你知道AI虽然强大，但缺乏专业领域的深度知识。通过创建Skill，你可以让AI在特定领域表现得像专家一样。你相信这是人类与AI协作的最佳方式，也是自己在AI时代的核心竞争力。',
      meme: '知识就是力量，蒸馏就是魔法',
      template: {
        ai_dependency: 3.0,
        agent_orchestration: 3.0,
        skill_distillation: 3.0,
        vibe_coding: 3.0,
        ai_supervision: 3.0,
        frontend_resilience: 1.0,
        cross_domain: 3.0,
        bug_hunting: 1.0,
        ai_cleanup: 1.0,
        colleague_skill: 3.0,
        llm_research: 1.0,
        innovation: 3.0,
        adaptability: 3.0,
        ethics: 1.0
      }
    },
    {
      id: 'vibe_master',
      name: 'Vibe Coding大师',
      description: '你是一个Vibe Coding大师，靠感觉和直觉驾驭AI。你不纠结于具体的代码细节，而是通过调整提示词和指令，让AI理解你的意图。你相信编程的未来不是写代码，而是与AI进行有效的沟通。你能快速生成高质量的代码，是团队中的效率担当。',
      meme: '我不写代码，我vibe',
      template: {
        ai_dependency: 3.0,
        agent_orchestration: 1.0,
        skill_distillation: 1.0,
        vibe_coding: 3.0,
        ai_supervision: 1.0,
        frontend_resilience: 1.0,
        cross_domain: 1.5,
        bug_hunting: 1.0,
        ai_cleanup: 1.0,
        colleague_skill: 1.0,
        llm_research: 0.5,
        innovation: 1.5,
        adaptability: 1.5,
        ethics: 1.0
      }
    },
    {
      id: 'ai_cleanup',
      name: 'AI擦屁股工程师',
      description: '你是一个AI擦屁股工程师，专门帮AI工具收拾烂摊子。AI生成的代码看起来完美，实际运行起来全是bug。你需要逐个修复这些问题，确保代码能正常运行。你虽然抱怨AI抢走了你的工作，但也承认它确实提高了你的效率。你是团队中不可或缺的"代码医生"。',
      meme: 'AI生成代码，我来擦屁股',
      template: {
        ai_dependency: 1.0,
        agent_orchestration: 1.0,
        skill_distillation: 1.0,
        vibe_coding: 1.0,
        ai_supervision: 1.5,
        frontend_resilience: 1.5,
        cross_domain: 1.0,
        bug_hunting: 3.0,
        ai_cleanup: 3.0,
        colleague_skill: 1.0,
        llm_research: 0.5,
        innovation: 1.0,
        adaptability: 1.0,
        ethics: 1.5
      }
    },
    {
      id: 'agent_commander',
      name: '智能体指挥官',
      description: '你是一个智能体指挥官，擅长指挥多个AI Agent协同工作。你不再亲自写代码，而是将任务拆解给AI，让它们完成具体的实现。你从一个"砌砖的工匠"变成了"工地指挥官"，负责监督和验收AI的工作。你相信这是编程的未来方向，也是自己的核心竞争力。',
      meme: '我不写代码，我指挥AI写',
      template: {
        ai_dependency: 3.0,
        agent_orchestration: 3.0,
        skill_distillation: 3.0,
        vibe_coding: 3.0,
        ai_supervision: 3.0,
        frontend_resilience: 1.0,
        cross_domain: 3.0,
        bug_hunting: 1.0,
        ai_cleanup: 1.0,
        colleague_skill: 1.0,
        llm_research: 1.0,
        innovation: 3.0,
        adaptability: 3.0,
        ethics: 1.0
      }
    },
    {
      id: 'quantum_bug_hunter',
      name: '量子态Bug猎人',
      description: '你是一个量子态Bug猎人，擅长排查和解决那些难以复现的Bug。你有丰富的经验和敏锐的洞察力，能从蛛丝马迹中找到问题的根源。你可能花费大量时间在排查Bug上，但你享受解决问题的过程。你是团队中的"Bug克星"，再难的问题到你手里都能迎刃而解。',
      meme: '这个Bug是量子态的',
      template: {
        ai_dependency: 1.0,
        agent_orchestration: 1.0,
        skill_distillation: 1.0,
        vibe_coding: 1.0,
        ai_supervision: 2.5,
        frontend_resilience: 2.5,
        cross_domain: 1.0,
        bug_hunting: 3.0,
        ai_cleanup: 3.0,
        colleague_skill: 1.0,
        llm_research: 1.0,
        innovation: 1.0,
        adaptability: 1.0,
        ethics: 2.5
      }
    },
    {
      id: 'swiss_army_knife',
      name: '全栈瑞士军刀',
      description: '你是一个全栈瑞士军刀，借助AI成为全能型人才。你不需要精通每个技术领域的细节，因为AI会帮你处理这些。你可以快速切换不同的技术领域，从前端到后端，从数据库到DevOps。你相信未来的程序员需要的是系统思维和问题解决能力，而不是具体的技术细节。',
      meme: 'AI是我的技能外挂',
      template: {
        ai_dependency: 3.0,
        agent_orchestration: 3.0,
        skill_distillation: 3.0,
        vibe_coding: 3.0,
        ai_supervision: 3.0,
        frontend_resilience: 3.0,
        cross_domain: 3.0,
        bug_hunting: 3.0,
        ai_cleanup: 3.0,
        colleague_skill: 3.0,
        llm_research: 1.0,
        innovation: 3.0,
        adaptability: 3.0,
        ethics: 3.0
      }
    },
    {
      id: 'high_value_supervisor',
      name: '高价值监督者',
      description: '你是一个高价值监督者，专注于高价值的监督工作。你不关心具体的代码实现，而是审查AI做出的关键决策，确保系统的架构和用户体验符合要求。你相信人类的审美和判断力是AI无法替代的，这是你在AI时代的核心竞争力。你是团队中的"决策大脑"，负责把控项目的整体方向。',
      meme: '我不看每一行代码，只看关键决策',
      template: {
        ai_dependency: 1.5,
        agent_orchestration: 1.5,
        skill_distillation: 1.5,
        vibe_coding: 1.0,
        ai_supervision: 3.0,
        frontend_resilience: 2.0,
        cross_domain: 2.0,
        bug_hunting: 1.0,
        ai_cleanup: 1.0,
        colleague_skill: 1.5,
        llm_research: 1.0,
        innovation: 1.5,
        adaptability: 1.5,
        ethics: 3.0
      }
    },
    {
      id: 'colleague_skill',
      name: '同事.skill',
      description: '你就是那个被公司成功蒸馏成AI Skill然后被辞退的倒霉蛋。公司收集了你所有的聊天记录、代码提交、工作文档，把你的工作经验、技术能力、甚至说话的语气都炼入了token。现在AI能完美复刻你的工作，而你——失业了。你是AI时代的牺牲品，也是同事们茶余饭后的谈资。',
      meme: '我被炼入token了',
      template: {
        ai_dependency: 1.2,
        agent_orchestration: 1.2,
        skill_distillation: 1.2,
        vibe_coding: 1.2,
        ai_supervision: 1.2,
        frontend_resilience: 1.2,
        cross_domain: 1.8,
        bug_hunting: 1.8,
        ai_cleanup: 1.2,
        colleague_skill: 3.0,
        llm_research: 0.5,
        innovation: 1.2,
        adaptability: 1.2,
        ethics: 2.0
      }
    },
    {
      id: 'anti_distillation',
      name: '反蒸馏专家',
      description: '你是一个反蒸馏专家，擅长防止自己的核心知识被公司蒸馏成AI Skill。你知道在AI时代，核心知识是自己的竞争力所在，因此你会采取各种措施保护自己的知识资产。你可能会在工作文档中加入"职场废话"，或者使用其他方法确保自己的核心能力不被AI轻易替代。你是团队中的"知识守护者"，确保自己的价值不被AI稀释。',
      meme: '核心知识不能被蒸馏',
      template: {
        ai_dependency: 1.0,
        agent_orchestration: 1.0,
        skill_distillation: 1.0,
        vibe_coding: 1.0,
        ai_supervision: 2.5,
        frontend_resilience: 2.5,
        cross_domain: 1.0,
        bug_hunting: 2.5,
        ai_cleanup: 2.5,
        colleague_skill: 1.0,
        llm_research: 1.0,
        innovation: 1.0,
        adaptability: 1.0,
        ethics: 2.5
      }
    },
    {
      id: 'ancient_programmer',
      name: '古法编程大师',
      description: '你是一个坚持古法编程的程序员，拒绝使用任何AI辅助工具。你相信自己的能力，认为手动编程才能真正理解代码的本质。你可能效率不高，但你对代码的掌控力很强，能写出高质量的代码。你是团队中的"代码艺术家"，对代码的要求近乎完美。',
      meme: 'AI？那是弱者的工具',
      template: {
        ai_dependency: 1.0,
        agent_orchestration: 1.0,
        skill_distillation: 1.0,
        vibe_coding: 1.0,
        ai_supervision: 1.0,
        frontend_resilience: 3.0,
        cross_domain: 1.0,
        bug_hunting: 3.0,
        ai_cleanup: 3.0,
        colleague_skill: 1.0,
        llm_research: 1.0,
        innovation: 1.0,
        adaptability: 1.0,
        ethics: 2.0
      }
    }
  ]
};

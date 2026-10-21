/**
 * 과학기술정보통신부 소개 웹 애플리케이션 JS (app.js)
 * 로컬 파일(file://)로 직접 더블클릭 실행 시에도 완벽 동작하도록
 * CORS 또는 서버 의존성 없이 순수 자바스크립트로 구현
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 다크 모드 토글
  initThemeToggle();

  // 2. 동향 탐색 인터랙티브 탭
  initTabs();

  // 3. 최신 뉴스 필터링 기능
  initNewsFilter();

  // 4. 국민 눈높이 퀴즈 기능
  initQuiz();

  // 5. 대국민 맞춤 혜택 진단 (체크리스트 & 설문)
  initBenefitChecker();

  // 6. 부드러운 스크롤 네비게이션 활성화
  initNavScroll();
});

/* ----------------------------------------------------
   1. 테마(다크/라이트) 전환
   ---------------------------------------------------- */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  if (!themeToggleBtn) return;

  // 로컬 스토리지 확인 (로컬 파일에서도 지원)
  try {
    const savedTheme = localStorage.getItem('msit_theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      updateThemeIcon(true);
    }
  } catch (e) {
    // 로컬 파일 보안 정책 등으로 localStorage 접근 불가 시 기본 유지
  }

  themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    updateThemeIcon(isDark);

    try {
      localStorage.setItem('msit_theme', isDark ? 'dark' : 'light');
    } catch (e) {}
  });

  function updateThemeIcon(isDark) {
    const icon = themeToggleBtn.querySelector('i');
    if (!icon) return;
    if (isDark) {
      icon.className = 'fa-solid fa-sun';
      icon.style.color = '#f59e0b';
    } else {
      icon.className = 'fa-solid fa-moon';
      icon.style.color = '';
    }
  }
}

/* ----------------------------------------------------
   2. 핵심동향 인터랙티브 탭 전환
   ---------------------------------------------------- */
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      // 버튼 활성화 처리
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // 패널 활성화 처리
      tabPanels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

/* ----------------------------------------------------
   3. 뉴스 필터링 기능 (카테고리별 전환)
   ---------------------------------------------------- */
function initNewsFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const newsCards = document.querySelectorAll('.news-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      newsCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ----------------------------------------------------
   4. 재미있는 과기정통부 상식 퀴즈
   ---------------------------------------------------- */
function initQuiz() {
  const quizData = [
    {
      question: "Q1. 2024년 5월 한국에서 개최되어 안전하고 혁신적인 인공지능 발전을 위한 국제 협력을 주도한 회의의 명칭은?",
      options: [
        "AI 서울정상회의 (Seoul AI Summit)",
        "글로벌 사이버 보안 총회",
        "우주항공 탐사 국제회의",
        "세계 양자컴퓨터 서밋"
      ],
      answer: 0,
      explanation: "과기정통부 주최로 2024년 5월 'AI 서울정상회의'가 열렸으며, 글로벌 AI 거버넌스 규범을 담은 '서울선언'을 채택했습니다."
    },
    {
      question: "Q2. 과기정통부가 대한민국의 미래 도약을 위해 선정한 '3대 게임체인저' 기술 분야가 아닌 것은?",
      options: [
        "인공지능 (AI)",
        "첨단바이오",
        "양자 (Quantum)",
        "화석연료 내연기관"
      ],
      answer: 3,
      explanation: "정부 3대 게임체인저는 'AI·반도체, 첨단바이오, 양자' 기술입니다. 화석연료 내연기관은 포함되지 않습니다."
    },
    {
      question: "Q3. 과기정통부의 국민 민생과 관련된 주요 역할 중 하나로 올바른 것은 무엇일까요?",
      options: [
        "가계 통신비 부담 완화 및 공공와이파이 확대",
        "부동산 실거래가 공시",
        "초중고등학교 무상급식 예산 배정",
        "교통신호 체계 및 고속도로 통행료 책정"
      ],
      answer: 0,
      explanation: "과기정통부는 5G 요금제 세분화, 알뜰폰 활성화, 무료 공공와이파이 확대, 보이스피싱 스미싱 예방 등 국민의 통신과 디지털 일상을 지원합니다."
    }
  ];

  let currentIdx = 0;
  let score = 0;

  const quizStep = document.getElementById('quizStep');
  const quizScoreText = document.getElementById('quizScoreText');
  const quizProgress = document.getElementById('quizProgress');
  const quizQuestion = document.getElementById('quizQuestion');
  const quizOptions = document.getElementById('quizOptions');
  const quizFeedback = document.getElementById('quizFeedback');

  if (!quizQuestion || !quizOptions) return;

  function loadQuestion() {
    const currentQuiz = quizData[currentIdx];
    quizStep.textContent = `문제 ${currentIdx + 1} / ${quizData.length}`;
    quizScoreText.textContent = `점수: ${score}점`;
    quizProgress.style.width = `${((currentIdx + 1) / quizData.length) * 100}%`;
    quizQuestion.textContent = currentQuiz.question;
    quizOptions.innerHTML = '';
    quizFeedback.className = 'quiz-feedback';
    quizFeedback.innerHTML = '';

    currentQuiz.options.forEach((optText, i) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-opt-btn';
      btn.innerHTML = `<span>${i + 1}. ${optText}</span><i class="fa-regular fa-circle"></i>`;
      btn.addEventListener('click', () => selectAnswer(i, btn));
      quizOptions.appendChild(btn);
    });
  }

  function selectAnswer(selectedIdx, btnElement) {
    const currentQuiz = quizData[currentIdx];
    const allBtns = quizOptions.querySelectorAll('.quiz-opt-btn');

    // 모든 버튼 비활성화
    allBtns.forEach(b => b.disabled = true);

    const isCorrect = selectedIdx === currentQuiz.answer;
    if (isCorrect) {
      score += 10;
      quizScoreText.textContent = `점수: ${score}점`;
      btnElement.classList.add('correct');
      btnElement.querySelector('i').className = 'fa-solid fa-circle-check';
      quizFeedback.className = 'quiz-feedback show success';
      quizFeedback.innerHTML = `<strong>정답입니다! 🎉</strong><br>${currentQuiz.explanation}`;
    } else {
      btnElement.classList.add('wrong');
      btnElement.querySelector('i').className = 'fa-solid fa-circle-xmark';
      allBtns[currentQuiz.answer].classList.add('correct');
      allBtns[currentQuiz.answer].querySelector('i').className = 'fa-solid fa-circle-check';
      quizFeedback.className = 'quiz-feedback show fail';
      quizFeedback.innerHTML = `<strong>아쉽네요! 정답은 ${currentQuiz.answer + 1}번입니다.</strong><br>${currentQuiz.explanation}`;
    }

    // 다음 버튼 추가
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn-next-quiz';
    if (currentIdx < quizData.length - 1) {
      nextBtn.innerHTML = '다음 문제 풀기 <i class="fa-solid fa-arrow-right"></i>';
      nextBtn.addEventListener('click', () => {
        currentIdx++;
        loadQuestion();
      });
    } else {
      nextBtn.innerHTML = '결과 보기 <i class="fa-solid fa-trophy"></i>';
      nextBtn.addEventListener('click', showResult);
    }
    quizFeedback.appendChild(nextBtn);
  }

  function showResult() {
    quizQuestion.textContent = `🎉 퀴즈를 모두 완료하셨습니다!`;
    quizStep.textContent = `완료`;
    quizOptions.innerHTML = `
      <div style="text-align: center; padding: 24px 0;">
        <div style="font-size: 3rem; margin-bottom: 12px; color: var(--primary);">
          <i class="fa-solid fa-award"></i>
        </div>
        <h4 style="font-size: 1.4rem; margin-bottom: 8px;">최종 점수: <strong>${score}점</strong> / 30점</h4>
        <p style="color: var(--text-muted); font-size: 0.95rem;">
          ${score === 30 ? '대단합니다! 과기정통부 전문가이시군요! 👏' : '과기정통부의 다양한 미래 정책과 뉴스를 확인해보세요! 😊'}
        </p>
      </div>
    `;
    quizFeedback.className = 'quiz-feedback show success';
    quizFeedback.innerHTML = `
      <span>과기정통부의 활약에 관심을 가져주셔서 감사합니다.</span>
      <button class="btn-next-quiz" id="retryBtn">다시 풀기 <i class="fa-solid fa-rotate-right"></i></button>
    `;

    document.getElementById('retryBtn').addEventListener('click', () => {
      currentIdx = 0;
      score = 0;
      loadQuestion();
    });
  }

  loadQuestion();
}

/* ----------------------------------------------------
   5. 대국민 맞춤 혜택 진단 (체크리스트 & 설문)
   ---------------------------------------------------- */
function initBenefitChecker() {
  // 과기정통부 대국민 지원 데이터베이스
  const benefitsDatabase = [
    {
      id: 'telecom-25',
      name: '스마트폰 요금 25% 선택약정 할인',
      category: 'telecom',
      roles: ['all', 'youth', 'senior', 'business'],
      icon: 'fa-solid fa-mobile-screen-button',
      badge: '통신비 절감',
      desc: '단말기 지원금을 받지 않았거나 약정이 만료된 휴대폰 사용자라면 매월 이동통신 요금 기본료의 25%를 할인받을 수 있습니다.',
      target: '<strong>대상:</strong> 자급제폰, 중고폰, 약정만료 휴대폰 사용자 누구나',
      url: 'https://www.smartchoice.or.kr',
      btnText: '스마트초이스에서 대상 단말기 조회'
    },
    {
      id: 'wifi-public',
      name: '전국 무료 공공와이파이(Public WiFi)',
      category: 'telecom',
      roles: ['all', 'youth', 'senior', 'business'],
      icon: 'fa-solid fa-wifi',
      badge: '데이터 무료',
      desc: '과기정통부와 지자체가 함께 버스, 정류장, 공공기관, 전통시장 등에 구축한 고품질 무료 WiFi로 데이터 걱정 없이 인터넷을 이용하세요.',
      target: '<strong>이용방법:</strong> 스마트폰 Wi-Fi 목록에서 "Public WiFi Free" 연결',
      url: 'https://www.wififree.kr',
      btnText: '내 주변 공공와이파이 지도 찾기'
    },
    {
      id: 'msafer',
      name: '엠세이퍼(Msafer) 명의도용 방지 서비스',
      category: 'security',
      roles: ['all', 'youth', 'senior', 'business'],
      icon: 'fa-solid fa-id-card',
      badge: '개인정보 보호',
      desc: '본인도 모르는 사이에 타인이 내 주민등록번호로 알뜰폰이나 유선인터넷을 무단 개통하지 못하도록 사전에 원천 차단해 줍니다.',
      target: '<strong>비용:</strong> 무료 (신규 개통 제한 및 개통 즉시 알림 문자 발송)',
      url: 'https://www.msafer.or.kr',
      btnText: '엠세이퍼 명의도용 차단 신청'
    },
    {
      id: 'kisa-smishing',
      name: 'KISA 카카오톡 스미싱 확인 & 악성앱 점검',
      category: 'security',
      roles: ['all', 'youth', 'senior'],
      icon: 'fa-solid fa-shield-virus',
      badge: '보이스피싱 예방',
      desc: '택배 배송, 모바일 청첩장, 과태료 고지 등 의심스러운 문자를 카카오톡 "보호나라" 채널에 붙여넣으면 10분 내로 악성 여부를 분석해 알려줍니다.',
      target: '<strong>제공처:</strong> 과기정통부 & 한국인터넷진흥원(KISA)',
      url: 'https://www.boho.or.kr',
      btnText: 'KISA 보호나라 바로가기'
    },
    {
      id: 'digital-baeum',
      name: '전국민 AI·디지털배움터 무료 교육',
      category: 'education',
      roles: ['all', 'senior', 'business'],
      icon: 'fa-solid fa-chalkboard-user',
      badge: '무료 역량 교육',
      desc: '동네 주민센터, 도서관 등 생활 공간에서 스마트폰 기초 활용, 키오스크 주문, 챗GPT 등 생성형 AI 활용법을 친절하게 무료로 가르쳐드립니다.',
      target: '<strong>대상:</strong> 어르신, 주부, 소상공인 등 전 국민 누구나',
      url: 'https://www.디지털배움터.kr',
      btnText: '디지털배움터 강좌 신청하기'
    },
    {
      id: 'stipend-scholarship',
      name: '이공계 대학원생 연구생활장려금(한국형 스타이펜드) & 대통령 장학금',
      category: 'research',
      roles: ['youth'],
      icon: 'fa-solid fa-graduation-cap',
      badge: '청년 연구자 지원',
      desc: '이공계 석·박사 과정 청년 연구자가 학비와 생계비 걱정 없이 학업과 연구에 몰입할 수 있도록 매월 안정적인 최소 연구생활비를 보장합니다.',
      target: '<strong>대상:</strong> 국내 대학 이공계 전공 대학원생 및 신진 연구자',
      url: 'https://www.korea.kr/briefing/pressReleaseView.do?newsId=156614138',
      btnText: '대통령 과학장학금 상세 내용 보기'
    },
    {
      id: 'ai-sw-youth',
      name: 'SW마에스트로 & 이노베이션 아카데미(42 Seoul)',
      category: 'education',
      roles: ['youth'],
      icon: 'fa-solid fa-code',
      badge: '청년 취업·창업',
      desc: '자기주도형 SW 학습 프로그램과 현업 최고 전문가 멘토링을 통해 실무 중심의 AI·소프트웨어 혁신 인재로 성장할 수 있는 전액 국비 교육입니다.',
      target: '<strong>지원:</strong> 교육비 전액 무료 + 월 학습지원비 및 맥북/장비 지원',
      url: 'https://www.swmaestro.org',
      btnText: 'SW마에스트로 연수생 모집 안내'
    },
    {
      id: 'senior-telecom',
      name: '기초연금 수급자 어르신 이동통신요금 감면',
      category: 'telecom',
      roles: ['senior'],
      icon: 'fa-solid fa-hand-holding-dollar',
      badge: '어르신 복지',
      desc: '만 65세 이상 기초연금 수급 어르신을 대상으로 월 이동통신요금을 최대 50%(월 최대 12,100원 한도)까지 직접 감면해 드립니다.',
      target: '<strong>신청:</strong> 주민센터 방문 또는 통신사 고객센터(114), 복지로(online)',
      url: 'https://www.bokjiro.go.kr',
      btnText: '복지로 요금감면 신청 안내'
    },
    {
      id: 'ai-voucher',
      name: '중소·벤처기업 AI 바우처 및 클라우드 바우처 지원',
      category: 'research',
      roles: ['business'],
      icon: 'fa-solid fa-microchip',
      badge: '기업 지원',
      desc: '인공지능(AI) 기술을 도입하여 제품 및 비즈니스를 혁신하고자 하는 중소·벤처·중견기업에 최대 수억 원 상당의 AI 솔루션 구매 바우처를 지급합니다.',
      target: '<strong>대상:</strong> AI 솔루션 적용을 희망하는 국내 중소·벤처·스타트업',
      url: 'https://www.nipa.kr',
      btnText: '정보통신산업진흥원(NIPA) 공모 보기'
    },
    {
      id: 'smb-security',
      name: '중소기업 사이버 보안 무료 안전진단 & 보안솔루션 지원',
      category: 'security',
      roles: ['business'],
      icon: 'fa-solid fa-building-shield',
      badge: '기업 보안',
      desc: '보안 전담 인력이 부족한 중소기업을 대상으로 웹서버 원격 취약점 점검, 랜섬웨어 예방 솔루션 및 정보보호 컨설팅을 전액 무료로 지원합니다.',
      target: '<strong>신청처:</strong> KISA 지역정보보호지원센터',
      url: 'https://krcert.or.kr',
      btnText: 'KISA 인터넷보호나라 보안지원 신청'
    }
  ];

  const roleCards = document.querySelectorAll('.role-card');
  const interestInputs = document.querySelectorAll('#interestSelector input[type="checkbox"]');
  const calcBtn = document.getElementById('calculateBenefitBtn');
  const resultCardsContainer = document.getElementById('resultCardsContainer');
  const matchCountElem = document.getElementById('matchCount');
  const resultRoleBadge = document.getElementById('resultRoleBadge');
  const printBtn = document.getElementById('printBenefitBtn');

  if (!calcBtn || !resultCardsContainer) return;

  // 현재 선택된 역할
  let currentRole = 'all';

  roleCards.forEach(card => {
    card.addEventListener('click', () => {
      roleCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      currentRole = card.getAttribute('data-role');

      // 역할에 따라 관심사 체크박스 스마트 자동 추천
      adjustInterestsForRole(currentRole);
      renderMatchingBenefits();
    });
  });

  // 역할에 따른 기본 관심사 프리셋
  function adjustInterestsForRole(role) {
    interestInputs.forEach(input => {
      if (role === 'youth') {
        input.checked = ['education', 'research', 'telecom'].includes(input.value);
      } else if (role === 'senior') {
        input.checked = ['telecom', 'security', 'education'].includes(input.value);
      } else if (role === 'business') {
        input.checked = ['research', 'security', 'education'].includes(input.value);
      } else {
        input.checked = ['telecom', 'security', 'education'].includes(input.value);
      }
    });
  }

  // 혜택 계산 및 렌더링 함수
  function renderMatchingBenefits() {
    // 체크된 관심 카테고리 추출
    const checkedCategories = Array.from(interestInputs)
      .filter(input => input.checked)
      .map(input => input.value);

    // 필터링: (내 역할에 맞거나 공통) AND (선택한 관심 카테고리 포함)
    const matches = benefitsDatabase.filter(item => {
      const roleMatch = item.roles.includes('all') || item.roles.includes(currentRole);
      const categoryMatch = checkedCategories.includes(item.category);
      return roleMatch && categoryMatch;
    });

    // 뱃지 텍스트 업데이트
    const roleNames = {
      'all': '일반 국민 맞춤 안내',
      'youth': '청년 · 대학(원)생 · 연구자 맞춤 안내',
      'senior': '어르신 · 디지털 취약계층 맞춤 안내',
      'business': '중소기업 · 소상공인 · 스타트업 맞춤 안내'
    };
    resultRoleBadge.textContent = roleNames[currentRole] || '맞춤 혜택 안내';
    matchCountElem.textContent = matches.length;

    // 카드 목록 렌더링
    if (matches.length === 0) {
      resultCardsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; background: var(--section-soft-bg); border-radius: var(--radius-md);">
          <i class="fa-solid fa-circle-exclamation" style="font-size: 2.5rem; color: var(--text-muted); margin-bottom: 12px;"></i>
          <p style="font-size: 1.1rem; font-weight: 600;">선택하신 조건에 해당하는 지원 정책을 찾지 못했습니다.</p>
          <p style="font-size: 0.9rem; color: var(--text-muted); margin-top: 4px;">상단의 관심 분야 체크박스를 1개 이상 선택해 주세요.</p>
        </div>
      `;
      return;
    }

    resultCardsContainer.innerHTML = matches.map(item => `
      <div class="benefit-item-card">
        <div class="benefit-top-row">
          <span class="benefit-badge">${item.badge}</span>
          <div class="benefit-icon-wrap">
            <i class="${item.icon}"></i>
          </div>
        </div>
        <h4 class="benefit-name">${item.name}</h4>
        <p class="benefit-desc">${item.desc}</p>
        <div class="benefit-target">${item.target}</div>
        <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="benefit-link-btn">
          ${item.btnText} <i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </div>
    `).join('');
  }

  // 버튼 클릭 시 혜택 계산 및 스크롤 이동
  calcBtn.addEventListener('click', () => {
    renderMatchingBenefits();
    const resultArea = document.getElementById('resultArea');
    if (resultArea) {
      resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });

  // 체크박스 클릭할 때도 실시간 즉시 반영
  interestInputs.forEach(chk => {
    chk.addEventListener('change', renderMatchingBenefits);
  });

  // 인쇄 기능
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // 초기 1회 자동 실행
  renderMatchingBenefits();
}

/* ----------------------------------------------------
   6. 스크롤 네비게이션 하이라이트
   ---------------------------------------------------- */
function initNavScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-item');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

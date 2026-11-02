const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const bjDir = path.join(rootDir, '백준');
const pgDir = path.join(rootDir, '프로그래머스');
const outputDir = path.join(rootDir, 'src', 'data');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

function normalizeStr(str) {
  if (!str) return '';
  return str.replace(/[\u200B-\u200D\uFEFF\u2005\u2000-\u200A]/g, ' ').trim();
}

function inferConceptAndComplexity(tier, tags = [], title = '') {
  const combined = (tags.join(' ') + ' ' + title).toLowerCase();
  let timeComplexity = 'O(N)';
  let spaceComplexity = 'O(1)';
  let concept = '구현 및 기본 알고리즘';

  if (combined.includes('다이나믹') || combined.includes('동적계획') || combined.includes('dp')) {
    concept = '동적 계획법 (Dynamic Programming) - 부분 문제의 최적해를 점화식으로 도출';
    timeComplexity = 'O(N) ~ O(N²)';
    spaceComplexity = 'O(N)';
  } else if (combined.includes('스택') || combined.includes('stack')) {
    concept = '스택 (Stack) - LIFO 구조를 활용한 괄호/수열/모노톤 스택 처리';
    timeComplexity = 'O(N)';
    spaceComplexity = 'O(N)';
  } else if (combined.includes('큐') || combined.includes('덱') || combined.includes('queue') || combined.includes('deque')) {
    concept = '큐 / 덱 (Queue / Deque) - FIFO 탐색 및 양방향 삽입/삭제 처리';
    timeComplexity = 'O(N)';
    spaceComplexity = 'O(N)';
  } else if (combined.includes('정렬') || combined.includes('sort')) {
    concept = '정렬 알고리즘 (Sorting) - 기준에 따른 데이터 정렬 및 우선순위 선정';
    timeComplexity = 'O(N log N)';
    spaceComplexity = 'O(N)';
  } else if (combined.includes('이분 탐색') || combined.includes('binary search')) {
    concept = '이분 탐색 (Binary Search) - 정렬된 범위에서 절반씩 탐색 구간 축소';
    timeComplexity = 'O(log N)';
    spaceComplexity = 'O(1)';
  } else if (combined.includes('백트래킹') || combined.includes('재귀') || combined.includes('backtracking')) {
    concept = '백트래킹 & 재귀 (Backtracking / Recursion) - 상태 공간 트리 완전 탐색 및 가지치기';
    timeComplexity = 'O(2^N) ~ O(N!)';
    spaceComplexity = 'O(N)';
  } else if (combined.includes('그리디') || combined.includes('greedy')) {
    concept = '그리디 알고리즘 (Greedy) - 매 순간 국소적 최적해를 선택';
    timeComplexity = 'O(N) ~ O(N log N)';
    spaceComplexity = 'O(1) ~ O(N)';
  } else if (combined.includes('수학') || combined.includes('사칙연산') || combined.includes('정수론')) {
    concept = '수학 및 정수론 (Mathematics / Number Theory) - 공식 및 수론적 규칙 활용';
    timeComplexity = 'O(1) ~ O(√N)';
    spaceComplexity = 'O(1)';
  } else if (combined.includes('해시') || combined.includes('맵') || combined.includes('hash')) {
    concept = '해시 맵 / 셋 (Hash Map / Set) - O(1) 키 기반 빠른 조회 및 빈도수 카운팅';
    timeComplexity = 'O(N)';
    spaceComplexity = 'O(N)';
  } else if (combined.includes('문자열') || combined.includes('string')) {
    concept = '문자열 처리 (String Manipulation) - 파싱 및 패턴 매칭';
    timeComplexity = 'O(N)';
    spaceComplexity = 'O(N)';
  } else if (combined.includes('그래프') || combined.includes('bfs') || combined.includes('dfs')) {
    concept = '그래프 탐색 (BFS / DFS) - 정점 및 간선 순회 최단거리/연결요소 탐색';
    timeComplexity = 'O(V + E)';
    spaceComplexity = 'O(V)';
  }

  return { concept, timeComplexity, spaceComplexity };
}

function getDifficultyWeight(platform, tier) {
  const t = (tier || '').toLowerCase();
  if (t.includes('bronze v') || t.includes('bronze 5')) return 1;
  if (t.includes('bronze iv') || t.includes('bronze 4')) return 2;
  if (t.includes('bronze iii') || t.includes('bronze 3')) return 3;
  if (t.includes('bronze ii') || t.includes('bronze 2')) return 4;
  if (t.includes('bronze i') || t.includes('bronze 1')) return 5;
  if (t.includes('silver v') || t.includes('silver 5')) return 6;
  if (t.includes('silver iv') || t.includes('silver 4')) return 7;
  if (t.includes('silver iii') || t.includes('silver 3')) return 8;
  if (t.includes('silver ii') || t.includes('silver 2')) return 9;
  if (t.includes('silver i') || t.includes('silver 1')) return 10;
  if (t.includes('gold v') || t.includes('gold 5')) return 11;
  if (t.includes('gold iv') || t.includes('gold 4')) return 12;
  if (t.includes('gold iii') || t.includes('gold 3')) return 13;
  if (t.includes('gold ii') || t.includes('gold 2')) return 14;
  if (t.includes('gold i') || t.includes('gold 1')) return 15;
  if (t.includes('level 0') || t.includes('기초') || t.includes('입문')) return 2;
  if (t.includes('level 1') || t.includes('lv.1')) return 6;
  if (t.includes('level 2') || t.includes('lv.2')) return 10;
  if (t.includes('level 3') || t.includes('lv.3')) return 14;
  return 5;
}

const problems = [];

// 1. Process Baekjoon
if (fs.existsSync(bjDir)) {
  const tiers = fs.readdirSync(bjDir);
  for (const tier of tiers) {
    const tierPath = path.join(bjDir, tier);
    if (!fs.statSync(tierPath).isDirectory()) continue;

    const probFolders = fs.readdirSync(tierPath);
    for (const folder of probFolders) {
      const folderPath = path.join(tierPath, folder);
      if (!fs.statSync(folderPath).isDirectory()) continue;

      const files = fs.readdirSync(folderPath);
      const mdFile = files.find(f => f.endsWith('.md'));
      const codeFile = files.find(f => f.endsWith('.js') || f.endsWith('.c') || f.endsWith('.cpp') || f.endsWith('.py'));

      let mdContent = '';
      if (mdFile) {
        mdContent = fs.readFileSync(path.join(folderPath, mdFile), 'utf8');
      }

      let codeContent = '';
      let codeLang = 'javascript';
      if (codeFile) {
        codeContent = fs.readFileSync(path.join(folderPath, codeFile), 'utf8');
        if (codeFile.endsWith('.c')) codeLang = 'c';
        else if (codeFile.endsWith('.cpp')) codeLang = 'cpp';
        else if (codeFile.endsWith('.py')) codeLang = 'python';
      }

      // Parse metadata from markdown
      const titleMatch = mdContent.match(/#\s*\[([^\]]+)\]\s*([^\n-]+)(?:-\s*(\d+))?/);
      let tierName = titleMatch ? normalizeStr(titleMatch[1]) : tier;
      let title = titleMatch ? normalizeStr(titleMatch[2]) : normalizeStr(folder);
      let probNum = titleMatch && titleMatch[3] ? titleMatch[3].trim() : '';

      if (!probNum) {
        const folderNumMatch = folder.match(/^(\d+)/);
        if (folderNumMatch) probNum = folderNumMatch[1];
      }

      const linkMatch = mdContent.match(/\[문제 링크\]\(([^)]+)\)/);
      const link = linkMatch ? linkMatch[1] : (probNum ? `https://www.acmicpc.net/problem/${probNum}` : '');

      const memTimeMatch = mdContent.match(/메모리:\s*([0-9\sKBmb]+),\s*시간:\s*([0-9\sms]+)/);
      const memory = memTimeMatch ? memTimeMatch[1].trim() : '';
      const time = memTimeMatch ? memTimeMatch[2].trim() : '';

      const catMatch = mdContent.match(/### 분류\s*\n+([^\n#]+)/);
      const tags = catMatch ? catMatch[1].split(',').map(s => normalizeStr(s)).filter(Boolean) : [];

      const submitMatch = mdContent.match(/### 제출 일자\s*\n+([^\n#]+)/);
      const submitDate = submitMatch ? normalizeStr(submitMatch[1]) : '';

      // Section extractions
      let description = '';
      let inputDesc = '';
      let outputDesc = '';

      const descMatch = mdContent.match(/### 문제 설명\s*([\s\S]*?)(?=### 입력|### 출력|$)/);
      if (descMatch) description = descMatch[1].trim();

      const inMatch = mdContent.match(/### 입력\s*([\s\S]*?)(?=### 출력|$)/);
      if (inMatch) inputDesc = inMatch[1].trim();

      const outMatch = mdContent.match(/### 출력\s*([\s\S]*?)$/);
      if (outMatch) outputDesc = outMatch[1].trim();

      const { concept, timeComplexity, spaceComplexity } = inferConceptAndComplexity(tierName, tags, title);

      problems.push({
        id: `bj-${probNum || folder}`,
        problemNumber: probNum || folder.split('.')[0] || '',
        title: title || folder,
        platform: 'Baekjoon',
        tier: tierName,
        difficultyWeight: getDifficultyWeight('Baekjoon', tierName),
        link,
        memory,
        time,
        submitDate,
        tags: tags.length > 0 ? tags : ['구현'],
        description: description || mdContent,
        inputDesc,
        outputDesc,
        solutionCode: codeContent,
        solutionLang: codeLang,
        solutionFileName: codeFile || '',
        concept,
        timeComplexity,
        spaceComplexity,
        sourcePath: path.relative(rootDir, folderPath)
      });
    }
  }
}

// 2. Process Programmers
if (fs.existsSync(pgDir)) {
  function processPgFolder(folderPath, defaultTier = 'Level 1') {
    const folderName = path.basename(folderPath);
    const files = fs.readdirSync(folderPath);

    const mdFile = files.find(f => f.endsWith('.md'));
    const txtFile = files.find(f => f.endsWith('.txt'));
    const codeFile = files.find(f => f.endsWith('.js') || f.endsWith('.c') || f.endsWith('.py'));

    let descContent = '';
    let mdContent = '';
    if (mdFile) {
      mdContent = fs.readFileSync(path.join(folderPath, mdFile), 'utf8');
      descContent = mdContent;
    } else if (txtFile) {
      descContent = fs.readFileSync(path.join(folderPath, txtFile), 'utf8');
    }

    let codeContent = '';
    let codeLang = 'javascript';
    if (codeFile) {
      codeContent = fs.readFileSync(path.join(folderPath, codeFile), 'utf8');
    }

    let tierName = defaultTier;
    let title = normalizeStr(folderName);
    let probNum = '';
    let link = 'https://school.programmers.co.kr/learn/challenges';
    let memory = '';
    let time = '';
    let submitDate = '';
    let tags = [];

    if (mdContent) {
      const titleMatch = mdContent.match(/#\s*\[([^\]]+)\]\s*([^\n-]+)(?:-\s*(\d+))?/);
      if (titleMatch) {
        tierName = normalizeStr(titleMatch[1]);
        title = normalizeStr(titleMatch[2]);
        if (titleMatch[3]) probNum = titleMatch[3].trim();
      }

      const linkMatch = mdContent.match(/\[문제 링크\]\(([^)]+)\)/);
      if (linkMatch) link = linkMatch[1];

      const memTimeMatch = mdContent.match(/메모리:\s*([0-9\sKBmbMB]+),\s*시간:\s*([0-9\sms]+)/);
      if (memTimeMatch) {
        memory = memTimeMatch[1].trim();
        time = memTimeMatch[2].trim();
      }

      const catMatch = mdContent.match(/### 구분\s*\n+([^\n#]+)/);
      if (catMatch) {
        tags = catMatch[1].split('>').map(s => normalizeStr(s)).filter(s => s && !s.includes('코딩테스트'));
      }

      const submitMatch = mdContent.match(/### 제출 일자\s*\n+([^\n#]+)/);
      if (submitMatch) submitDate = normalizeStr(submitMatch[1]);
    }

    // Fallback tag deduction for common Programmers problems
    if (tags.length === 0) {
      if (title.includes('의상') || title.includes('완주하지')) tags.push('해시');
      else if (title.includes('기능개발') || title.includes('주식가격') || title.includes('스택')) tags.push('스택/큐');
      else if (title.includes('H-Index') || title.includes('가장 큰 수')) tags.push('정렬');
      else if (title.includes('수') || title.includes('나머지') || title.includes('배수') || title.includes('각도기') || title.includes('곱') || title.includes('차') || title.includes('합') || title.includes('나눗셈') || title.includes('몫')) tags.push('수학');
      else if (title.includes('글자') || title.includes('영어') || title.includes('사전')) tags.push('문자열');
      else tags.push('연습문제');
    }

    if (!probNum) {
      const numMatch = folderName.match(/^(\d+)/);
      if (numMatch) probNum = numMatch[1];
    }

    const { concept, timeComplexity, spaceComplexity } = inferConceptAndComplexity(tierName, tags, title);

    problems.push({
      id: `pg-${probNum || folderName}`,
      problemNumber: probNum || '',
      title: title || folderName,
      platform: 'Programmers',
      tier: tierName,
      difficultyWeight: getDifficultyWeight('Programmers', tierName),
      link,
      memory,
      time,
      submitDate,
      tags,
      description: descContent || '문제 설명이 제공되지 않았습니다.',
      inputDesc: '',
      outputDesc: '',
      solutionCode: codeContent,
      solutionLang: codeLang,
      solutionFileName: codeFile || '',
      concept,
      timeComplexity,
      spaceComplexity,
      sourcePath: path.relative(rootDir, folderPath)
    });
  }

  const pgEntries = fs.readdirSync(pgDir);
  for (const entry of pgEntries) {
    if (entry.startsWith('.')) continue;
    const entryPath = path.join(pgDir, entry);
    if (!fs.statSync(entryPath).isDirectory()) continue;

    if (entry === '2') {
      const subEntries = fs.readdirSync(entryPath);
      for (const sub of subEntries) {
        const subPath = path.join(entryPath, sub);
        if (fs.statSync(subPath).isDirectory()) {
          processPgFolder(subPath, 'Level 2');
        }
      }
    } else {
      processPgFolder(entryPath, entry.includes('의상') || entry.includes('완주') || entry.includes('기능개발') ? 'Level 2' : '기초/입문');
    }
  }
}

// Sort problems: Gold -> Silver -> Bronze -> Level 2 -> Level 1 -> Level 0
problems.sort((a, b) => {
  if (b.difficultyWeight !== a.difficultyWeight) {
    return b.difficultyWeight - a.difficultyWeight;
  }
  return a.title.localeCompare(b.title, 'ko');
});

const outputPath = path.join(outputDir, 'problems.json');
fs.writeFileSync(outputPath, JSON.stringify(problems, null, 2), 'utf8');

console.log(`Successfully extracted ${problems.length} problems!`);
console.log(`- Baekjoon: ${problems.filter(p => p.platform === 'Baekjoon').length}`);
console.log(`- Programmers: ${problems.filter(p => p.platform === 'Programmers').length}`);
console.log(`Saved to ${outputPath}`);

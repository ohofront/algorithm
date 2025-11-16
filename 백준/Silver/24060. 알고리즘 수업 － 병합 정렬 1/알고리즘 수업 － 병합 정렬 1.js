// ─────────────────────────────────────────────
// 1. 입력 처리
// ─────────────────────────────────────────────
const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split(/\s+/).map(Number);

const N = input[0]; // 배열 크기
const K = input[1]; // K번째 저장
let idx = 2;

// 문제에서 배열 인덱스를 1부터 쓰므로, JS에서도 1-based로 맞춰준다.
const A = new Array(N + 1);
for (let i = 1; i <= N; i++) {
  A[i] = input[idx++];
}

// 병합 과정에서 사용할 임시 배열 (한 번만 생성해서 재사용)
const tmp = new Array(N + 1);

// 몇 번 저장했는지 세는 카운터
let saveCount = 0;

// K번째 저장된 값을 기록할 변수 (기본값은 -1)
let answer = -1;

// ─────────────────────────────────────────────
// 2. 병합 정렬 함수 구현
//    mergeSort, merge
// ─────────────────────────────────────────────

/**
 * 병합 정렬
 * A[p..r] 구간을 정렬한다.
 * @param {number[]} A - 정렬할 배열 (1-based)
 * @param {number} p   - 구간의 시작 인덱스
 * @param {number} r   - 구간의 끝 인덱스
 */
function mergeSort(A, p, r) {
  if (p < r) {
    const q = Math.floor((p + r) / 2); // 중간 지점
    mergeSort(A, p, q);     // 왼쪽 반 정렬
    mergeSort(A, q + 1, r); // 오른쪽 반 정렬
    merge(A, p, q, r);      // 두 구간 병합
  }
}

/**
 * 병합 함수
 * A[p..q], A[q+1..r]는 이미 정렬되어 있다고 가정
 * 이 두 구간을 하나의 정렬된 구간으로 만든다.
 */
function merge(A, p, q, r) {
  let i = p;       // 왼쪽 구간 포인터
  let j = q + 1;   // 오른쪽 구간 포인터
  let t = p;       // tmp 배열에 채워 넣을 위치

  // 왼쪽과 오른쪽을 비교하며 작은 값을 tmp에 저장
  while (i <= q && j <= r) {
    if (A[i] <= A[j]) {
      tmp[t++] = A[i++];
    } else {
      tmp[t++] = A[j++];
    }
  }

  // 왼쪽 구간에 남은 값 복사
  while (i <= q) {
    tmp[t++] = A[i++];
  }

  // 오른쪽 구간에 남은 값 복사
  while (j <= r) {
    tmp[t++] = A[j++];
  }

  // tmp[p..r]을 다시 A[p..r]에 복사
  // 이 순간이 바로 "저장"이므로, 저장할 때마다 카운트 + 체크
  for (let k = p; k <= r; k++) {
    A[k] = tmp[k];   // 실제로 배열에 저장
    saveCount++;     // 저장 횟수 1 증가

    // 만약 이번 저장이 K번째라면 정답 기록
    if (saveCount === K) {
      answer = A[k];
      // 여기서 멈추지 않고 끝까지 수행해도 문제 없음
    }
  }
}

// ─────────────────────────────────────────────
// 3. 병합 정렬 실행 & 정답 출력
// ─────────────────────────────────────────────
mergeSort(A, 1, N);
console.log(answer);
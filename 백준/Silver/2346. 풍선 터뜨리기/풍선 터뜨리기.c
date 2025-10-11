#include <stdio.h>

int movev[1001];
int next_[1001], prev_[1001];
int ans[1000];

int main(void) {
    int N;
    if (scanf("%d", &N) != 1) return 0;
    for (int i = 1; i <= N; ++i) scanf("%d", &movev[i]);

    // 원형 이중 연결 리스트 구성
    for (int i = 1; i <= N; ++i) {
        next_[i] = (i == N) ? 1 : i + 1;
        prev_[i] = (i == 1) ? N : i - 1;
    }

    int cur = 1, remain = N, outp = 0;

    while (remain > 0) {
        ans[outp++] = cur;
        int step = movev[cur];

        if (--remain == 0) break; // 마지막이면 종료

        // cur 제거: 양옆을 연결
        int L = prev_[cur], R = next_[cur];
        next_[L] = R;
        prev_[R] = L;

        // 제거 후 시작 지점
        cur = R;

        if (step > 0) {
            int k = (step - 1) % remain;
            while (k--) cur = next_[cur];
        } else if (step < 0) {
            int k = (-step) % remain;
            while (k--) cur = prev_[cur];
        }
    }

    for (int i = 0; i < outp; ++i) {
        if (i) putchar(' ');
        printf("%d", ans[i]);
    }
    putchar('\n');
    return 0;
}
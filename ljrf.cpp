#include <iostream>
#include <vector>
#include <algorithm>
#include <iomanip>
using namespace std;

struct Job { int id, burst, remaining; };

int main() {
    int n, m;
    cout << "Number of CPUs: "; cin >> n;
    cout << "Number of jobs: "; cin >> m;

    vector<Job> jobs(m);
    for(int i=0;i<m;i++){
        jobs[i].id=i+1;
        cout << "Burst time of Job " << i+1 << ": ";
        cin >> jobs[i].burst;
        jobs[i].remaining=jobs[i].burst;
    }

    vector<vector<int>> gantt(n);
    int finished=0, time=0;

    while(finished<m){
        vector<int> order;
        for(int i=0;i<m;i++) if(jobs[i].remaining>0) order.push_back(i);

        sort(order.begin(),order.end(),[&](int a,int b){
            if(jobs[a].remaining!=jobs[b].remaining)
                return jobs[a].remaining>jobs[b].remaining;
            return jobs[a].id<jobs[b].id;
        });

        for(int c=0;c<n;c++){
            if(c<(int)order.size()){
                int i=order[c];
                gantt[c].push_back(jobs[i].id);
                jobs[i].remaining--;
                if(jobs[i].remaining==0) finished++;
            } else gantt[c].push_back(0);
        }
        time++;
    }

    int work=0;
    for(auto &j:jobs) work+=j.burst;
    double util=(double)work/(n*time)*100.0;

    cout << "\n=== LJRF RESULT ===\n";
    cout << "Makespan: " << time << " units\n";
    cout << fixed << setprecision(2);
    cout << "CPU Utilization: " << util << "%\n";

    cout << "\nGantt Chart\n";
    for(int c=0;c<n;c++){
        cout << "CPU " << c+1 << " | ";
        for(int x:gantt[c]) cout << (x ? "J"+to_string(x) : "IDLE") << " ";
        cout << "\n";
    }
}
LJRF MULTI-CPU SCHEDULING PROJECT

Files:
- index.html : visual simulator
- style.css  : UI design
- script.js  : LJRF algorithm + Gantt + utilization/load graphs
- ljrf.cpp   : C++ implementation

Run the web simulator:
1. Keep all four files in the same folder.
2. Open index.html in Chrome/Edge/Firefox.
3. Enter CPUs and burst times.
4. Click Run LJRF.

Run C++:
g++ ljrf.cpp -o ljrf
./ljrf

Algorithm used:
All jobs arrive at time 0. At every time unit, unfinished jobs are sorted by
remaining burst time in descending order. Up to n longest jobs run, one per CPU,
for one time unit. Their remaining times are reduced and the process repeats.

Metrics:
CPU utilization = Total work / (Number of CPUs × Makespan) × 100
Load imbalance = (Maximum CPU load - Minimum CPU load) / Average CPU load × 100

This is a custom multiprocessor LJRF simulator for an Operating Systems project.

import numpy as np
import matplotlib.pyplot as plt

def split_plot():
    x_dev = np.linspace(25, 35, num=11)
    y_dev = [38496, 42000, 46752, 49320, 53200, 56000, 62316, 64928, 67317, 68748, 73752]
    x_linear = np.linspace(0, 10, 100)
    y_linear = 2 * x_linear + 3
    x_sin = np.linspace(0, 10, 100)
    y_sin = np.sin(x_sin)*10+10
    x_exp = np.linspace(0, 10, 100)
    y_exp = np.exp(x_exp)
    x_random = np.random.rand(100)*10
    y_random = np.random.rand(100)*10

    fig, (ax1, ax2) = plt.subplots(2, 1, sharex=True)
    ax1.plot(x_exp, y_exp)
    ax2.plot(x_exp, y_exp)
    ax2.plot(x_linear, y_linear)
    ax2.plot(x_sin, y_sin)
    ax2.scatter(x_random, y_random)
    ax1.set_ylim(20000-25, 20000)
    ax2.set_ylim(0, 25)

    # ax2.fill_between(x_sin, y_sin, y_linear, alpha=0.25)
    ax2.fill_between(x_sin, y_sin, y_linear, where=(y_sin > 5), alpha=0.25)

    # Stolen Code - prettifying --------------------------------------------
    ax1.spines.bottom.set_visible(False)
    ax2.spines.top.set_visible(False)
    ax1.xaxis.tick_top()
    ax1.tick_params(labeltop=False)  # don't put tick labels at the top
    ax2.xaxis.tick_bottom()
    d = .5  # proportion of vertical to horizontal extent of the slanted line
    kwargs = dict(marker=[(-1, -d), (1, d)], markersize=12,
                linestyle="none", color='k', mec='k', mew=1, clip_on=False)
    ax1.plot([0, 1], [0, 0], transform=ax1.transAxes, **kwargs)
    ax2.plot([0, 1], [1, 1], transform=ax2.transAxes, **kwargs)
    # ----------------------------------------------------------------------

def pie_plot():
    slices = np.random.rand(10)
    a = np.random.rand(10)
    print(a)
    # a[a > 0.5] = 1
    # a[a <= 0.5] = 0
    a = [0 if a < 0.5 else 0.1 for a in a]
    print(a)
    plt.pie(slices, explode=a)


def stacked_plot():
    x = np.linspace(1, 10, num=10)
    p1 = np.round(np.random.rand(10)*10)
    p2 = np.round(np.random.rand(10)*10)
    p3 = np.round(np.random.rand(10)*10)
    labels = ["p1", "p2", "p3"]

    plt.stackplot(x, p1, p2, p3, labels=labels)
    plt.legend()

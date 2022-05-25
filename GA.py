from math import sin, cos
# 导入种群和内置算子相关类
from gaft import GAEngine
from gaft.components import GAIndividual
from gaft.components import GAPopulation
from gaft.operators import RouletteWheelSelection
from gaft.operators import UniformCrossover
from gaft.operators import FlipBitMutation
# 用于编写分析插件的接口类
from gaft.plugin_interfaces.analysis import OnTheFlyAnalysis
# 内置的存档适应度函数的分析类
from gaft.analysis.fitness_store import FitnessStoreAnalysis
# 我们将用两种方式将分析插件注册到遗传算法引擎中


# 定义种群
indv_template = GAIndividual(ranges=[(0, 10)], encoding='binary', eps=0.001)
population = GAPopulation(indv_template=indv_template, size=50)
# 创建遗传算子
selection = RouletteWheelSelection()
crossover = UniformCrossover(pc=0.8, pe=0.5)
mutation = FlipBitMutation(pm=0.1)
# 创建遗传算法引擎, 分析插件和适应度函数可以以参数的形式传入引擎中
engine = GAEngine(population=population, selection=selection,
                  crossover=crossover, mutation=mutation,
                  analysis=[FitnessStoreAnalysis])


@engine.fitness_register
def fitness(indv):
    x, = indv.variants
    return x + 10*sin(5*x) + 7*cos(4*x)


@engine.analysis_register
class ConsoleOutputAnalysis(OnTheFlyAnalysis):
    interval = 1

    def register_step(self, ng, population, engine):
        best_indv = population.best_indv(engine.fitness)
        msg = 'Generation: {}, best fitness: {:.3f}'.format(
            ng, engine.fitness(best_indv))
        engine.logger.info(msg)

    def finalize(self, population, engine):
        best_indv = population.best_indv(engine.fitness)
        x = best_indv.variants
        y = engine.fitness(best_indv)
        msg = 'Optimal solution: ({}, {})'.format(x, y)
        engine.logger.info(msg)


if '__main__' == __name__:
    # Run the GA engine.
    engine.run(ng=100)

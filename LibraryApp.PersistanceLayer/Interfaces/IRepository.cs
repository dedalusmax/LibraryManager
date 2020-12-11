using LibraryApp.DomainLayer.Entities;
using Microsoft.EntityFrameworkCore.Query;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace LibraryApp.PersistanceLayer.Interfaces
{
    public interface IRepository<TEntity> where TEntity : BaseEntity
    {
        /// <summary>
        /// Gets all entities
        /// </summary>
        /// <param name="filter">Filter predicate</param>
        /// <param name="orderBy">Order by statement</param>
        /// <param name="include">Include statement</param>
        /// <param name="disableTracking">Disables tracking</param>
        /// <param name="cancellationToken"></param>
        Task<IEnumerable<TEntity>> GetAll(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            bool disableTracking = true,
            CancellationToken cancellationToken = default);

        /// <summary>
        /// Gets single entity by ID
        /// </summary>
        /// <param name="filter">Filter predicate</param>
        /// <param name="orderBy">Order by statement</param>
        /// <param name="include">Include statement</param>
        /// <param name="disableTracking">Disables tracking</param>
        /// <param name="cancellationToken"></param>
        /// <returns></returns>
        Task<TEntity> Get(Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null,
            bool disableTracking = true,
            CancellationToken cancellationToken = default);

        /// <summary>
        /// Inserts single entity
        /// </summary>
        Task<Guid> Insert(TEntity entity, CancellationToken cancellationToken = default);

        /// <summary>
        /// Updates single entity
        /// </summary>
        Task Update(TEntity entity, CancellationToken cancellationToken = default);

        /// <summary>
        /// Removes single entity
        /// </summary>
        Task Delete(Guid id, CancellationToken cancellationToken = default);
    }
}
